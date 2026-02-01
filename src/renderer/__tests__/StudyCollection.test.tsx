import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StudyCollection from '../components/StudyCollection';
import { jsPDF } from 'jspdf';

// Mock jspdf
vi.mock('jspdf', () => {
  return {
    jsPDF: vi.fn().mockImplementation(() => ({
      setFontSize: vi.fn(),
      text: vi.fn(),
      splitTextToSize: vi.fn().mockReturnValue(['line1', 'line2']),
      addPage: vi.fn(),
      setFont: vi.fn(),
      save: vi.fn(),
    })),
  };
});

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();

describe('StudyCollection', () => {
  const mockOnFocusChange = vi.fn();
  const mockOnNotesChange = vi.fn();
  const mockOnRemoveVerse = vi.fn();

  const pinnedVerses = [
    { id: '1', reference: 'John 3:16', text: 'For God so loved the world...' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <StudyCollection
        focus="Test Focus"
        onFocusChange={mockOnFocusChange}
        notes="Test Notes"
        onNotesChange={mockOnNotesChange}
        pinnedVerses={pinnedVerses}
        onRemoveVerse={mockOnRemoveVerse}
      />
    );

    expect(screen.getByDisplayValue('Test Focus')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Notes')).toBeInTheDocument();
    expect(screen.getByText('John 3:16')).toBeInTheDocument();
    expect(screen.getByText('Export Markdown')).toBeInTheDocument();
    expect(screen.getByText('Export PDF')).toBeInTheDocument();
  });

  it('calls onNotesChange when notes are edited', () => {
    render(
      <StudyCollection
        focus="Test Focus"
        onFocusChange={mockOnFocusChange}
        notes=""
        onNotesChange={mockOnNotesChange}
        pinnedVerses={[]}
        onRemoveVerse={mockOnRemoveVerse}
      />
    );

    const textarea = screen.getByPlaceholderText('Capture observations or themes...');
    fireEvent.change(textarea, { target: { value: 'New Note' } });
    expect(mockOnNotesChange).toHaveBeenCalledWith('New Note');
  });

  it('triggers PDF export', () => {
    render(
        <StudyCollection
          focus="Test Focus"
          onFocusChange={mockOnFocusChange}
          notes="Test Notes"
          onNotesChange={mockOnNotesChange}
          pinnedVerses={pinnedVerses}
          onRemoveVerse={mockOnRemoveVerse}
        />
      );

      const pdfButton = screen.getByText('Export PDF');
      fireEvent.click(pdfButton);

      expect(jsPDF).toHaveBeenCalled();
  });
});
