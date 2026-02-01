import { useRef, useMemo, useState, useEffect } from "react";
import ForceGraph2D, { ForceGraphMethods, NodeObject, LinkObject } from "react-force-graph-2d";

// Define our node and link types extending the library's basic types
interface GraphNode extends NodeObject {
  id: string;
  label: string;
  group: "verse" | "tag" | "sermon" | "note" | "person";
  val?: number; // Size
}

interface GraphLink extends LinkObject {
  source: string | GraphNode;
  target: string | GraphNode;
  type?: string;
}

const KnowledgeGraph = () => {
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const data = useMemo(() => {
    // Mock Data for POC
    const nodes: GraphNode[] = [
      // Verses
      { id: "John 3:16", label: "John 3:16", group: "verse", val: 10 },
      { id: "Rom 8:28", label: "Rom 8:28", group: "verse", val: 8 },
      { id: "Gen 1:1", label: "Gen 1:1", group: "verse", val: 8 },
      { id: "Eph 2:8", label: "Eph 2:8", group: "verse", val: 8 },

      // Tags/Topics
      { id: "Love", label: "Love", group: "tag", val: 15 },
      { id: "Grace", label: "Grace", group: "tag", val: 12 },
      { id: "Creation", label: "Creation", group: "tag", val: 12 },
      { id: "Salvation", label: "Salvation", group: "tag", val: 12 },

      // Sermons
      { id: "Sermon1", label: "The Greatest Gift", group: "sermon", val: 20 },
      { id: "Sermon2", label: "Understanding Grace", group: "sermon", val: 18 },

      // People
      { id: "Paul", label: "Paul", group: "person", val: 10 },
      { id: "Jesus", label: "Jesus", group: "person", val: 25 },
    ];

    const links: GraphLink[] = [
      // Verse <-> Tag
      { source: "John 3:16", target: "Love" },
      { source: "John 3:16", target: "Salvation" },
      { source: "John 3:16", target: "Jesus" },

      { source: "Eph 2:8", target: "Grace" },
      { source: "Eph 2:8", target: "Salvation" },
      { source: "Eph 2:8", target: "Paul" },

      { source: "Rom 8:28", target: "Love" },
      { source: "Rom 8:28", target: "Paul" },

      { source: "Gen 1:1", target: "Creation" },
      { source: "Gen 1:1", target: "Jesus" }, // Colossians 1 link implication

      // Sermon <-> Tag/Verse
      { source: "Sermon1", target: "John 3:16" },
      { source: "Sermon1", target: "Love" },

      { source: "Sermon2", target: "Eph 2:8" },
      { source: "Sermon2", target: "Grace" },

      // Inter-tag
      { source: "Love", target: "Grace" },
      { source: "Salvation", target: "Grace" },
    ];

    return { nodes, links };
  }, []);

  const getNodeColor = (node: GraphNode) => {
    switch (node.group) {
      case "verse": return "#4ade80"; // green-400
      case "tag": return "#60a5fa";   // blue-400
      case "sermon": return "#f472b6";// pink-400
      case "person": return "#fbbf24";// amber-400
      default: return "#9ca3af";
    }
  };

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        nodeLabel="label"
        nodeColor={(node: any) => getNodeColor(node)}
        nodeRelSize={6}
        linkColor={() => "#ffffff33"}
        backgroundColor="#0f0f12"
        onNodeClick={(node) => {
          // Center view on node
          fgRef.current?.centerAt(node.x, node.y, 1000);
          fgRef.current?.zoom(4, 2000);
        }}
      />
      <div style={{ position: "absolute", bottom: 20, left: 20, background: "rgba(0,0,0,0.7)", padding: 10, borderRadius: 8, color: "white" }}>
        <h4 style={{ margin: "0 0 5px 0" }}>Legend</h4>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{width: 10, height: 10, background: "#4ade80", borderRadius: "50%"}}></span> Verse</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{width: 10, height: 10, background: "#60a5fa", borderRadius: "50%"}}></span> Topic</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{width: 10, height: 10, background: "#f472b6", borderRadius: "50%"}}></span> Sermon</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{width: 10, height: 10, background: "#fbbf24", borderRadius: "50%"}}></span> Person</div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
