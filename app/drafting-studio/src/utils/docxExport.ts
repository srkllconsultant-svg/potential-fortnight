import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, BorderStyle, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { LegalDraftRequest, GeneratedDraft } from '../types';

export async function exportDraftToDocx(draft: GeneratedDraft, request: LegalDraftRequest) {
  // Parse paragraphs from HTML or raw markdown
  const rawText = draft.rawMarkdown || draft.documentHtml.replace(/<[^>]+>/g, '\n');
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const docParagraphs: Paragraph[] = [];

  // Title / Document Header
  docParagraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300, before: 100 },
      children: [
        new TextRun({
          text: draft.title.toUpperCase(),
          bold: true,
          size: 32, // 16pt font
          font: 'Times New Roman',
        }),
      ],
    })
  );

  // Jurisdiction & Statutory Reference Sub-header
  docParagraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: `[Governed by: ${draft.jurisdictionSummary}]`,
          italics: true,
          size: 20, // 10pt font
          font: 'Times New Roman',
          color: '555555',
        }),
      ],
    })
  );

  // Add all lines as paragraphs
  for (const line of lines) {
    // Check if line is a major heading
    if (line.startsWith('# ') || line.startsWith('## ') || line.toUpperCase().startsWith('DEED OF') || line.toUpperCase().startsWith('WHEREAS') || line.toUpperCase().startsWith('NOW THIS DEED WITNESSETH')) {
      const headingText = line.replace(/^#+\s*/, '');
      docParagraphs.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: headingText,
              bold: true,
              size: 24, // 12pt
              font: 'Times New Roman',
              color: '1A202C',
            }),
          ],
        })
      );
    } else if (line.match(/^(CLAUSE|\d+\.|ARTICLE|[A-Z0-9\.\-\s]{3,20}:)/i)) {
      docParagraphs.push(
        new Paragraph({
          spacing: { before: 180, after: 100 },
          children: [
            new TextRun({
              text: line,
              bold: line.length < 80,
              size: 22,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else {
      docParagraphs.push(
        new Paragraph({
          spacing: { after: 140, line: 276 }, // 1.15 line spacing
          children: [
            new TextRun({
              text: line,
              size: 22, // 11pt
              font: 'Times New Roman',
            }),
          ],
        })
      );
    }
  }

  // Create Property Schedule Table if Property Details Exist
  let propertyTable: Table | null = null;
  if (request.propertyDetails) {
    const p = request.propertyDetails;
    const b = p.boundaries;
    propertyTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: 'SCHEDULE OF PROPERTY & BOUNDARIES', bold: true, size: 22, font: 'Times New Roman' })],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Property Type & Survey No.', bold: true, size: 20 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${p.propertyType} | ${p.surveyNumber}`, size: 20 })] })] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Extent / Total Area', bold: true, size: 20 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${p.totalArea} ${p.areaUnit}`, size: 20 })] })] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'North Boundary', bold: true, size: 20 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: b.north || 'N/A', size: 20 })] })] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'South Boundary', bold: true, size: 20 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: b.south || 'N/A', size: 20 })] })] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'East Boundary', bold: true, size: 20 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: b.east || 'N/A', size: 20 })] })] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'West Boundary', bold: true, size: 20 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: b.west || 'N/A', size: 20 })] })] }),
          ],
        }),
      ],
    });
  }

  // Create Execution & Witness Table
  const executionTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
      left: { style: BorderStyle.NONE, size: 0, color: 'AUTO' },
      right: { style: BorderStyle.NONE, size: 0, color: 'AUTO' },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                spacing: { before: 200, after: 600 },
                children: [new TextRun({ text: 'FIRST PARTY / EXECUTANT SIGNATURE:', bold: true, size: 22 })],
              }),
              new Paragraph({
                children: [new TextRun({ text: '_____________________________________\nName: ' + (request.parties.find(p => p.partyRole === 'Seller' || p.partyRole === 'Lessor' || p.partyRole === 'First Party')?.fullName || 'First Party'), size: 20 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                spacing: { before: 200, after: 600 },
                children: [new TextRun({ text: 'SECOND PARTY / EXECUTANT SIGNATURE:', bold: true, size: 22 })],
              }),
              new Paragraph({
                children: [new TextRun({ text: '_____________________________________\nName: ' + (request.parties.find(p => p.partyRole === 'Purchaser' || p.partyRole === 'Lessee' || p.partyRole === 'Second Party')?.fullName || 'Second Party'), size: 20 })],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                spacing: { before: 400, after: 400 },
                children: [new TextRun({ text: 'WITNESS 1 SIGNATURE:\n\n_____________________________________\nName: ' + (request.witnesses[0]?.fullName || 'Witness 1') + '\nID: ' + (request.witnesses[0]?.idNumber || ''), size: 20 })],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                spacing: { before: 400, after: 400 },
                children: [new TextRun({ text: 'WITNESS 2 SIGNATURE:\n\n_____________________________________\nName: ' + (request.witnesses[1]?.fullName || 'Witness 2') + '\nID: ' + (request.witnesses[1]?.idNumber || ''), size: 20 })],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const childrenElements: (Paragraph | Table)[] = [...docParagraphs];
  if (propertyTable) {
    childrenElements.push(
      new Paragraph({ spacing: { before: 300, after: 100 }, children: [new TextRun({ text: '', size: 20 })] }),
      propertyTable
    );
  }
  childrenElements.push(
    new Paragraph({ spacing: { before: 400, after: 200 }, children: [new TextRun({ text: 'IN WITNESS WHEREOF, THE PARTIES HERETO HAVE EXECUTED THIS DEED ON THE DAY, MONTH AND YEAR FIRST ABOVE WRITTEN.', bold: true, size: 22, font: 'Times New Roman' })] }),
    executionTable
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: childrenElements,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${draft.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${request.jurisdiction.city.toLowerCase()}_draft.docx`;
  saveAs(blob, fileName);
}
