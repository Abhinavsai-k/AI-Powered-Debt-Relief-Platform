// Replace Entire File
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateFinancialReport = (user, profileData, loans) => {
    // 🔴 Validation check to prevent crashes if data is missing
    if (!user || !profileData) {
        console.error("Missing data for PDF generation");
        return;
    }

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text(`Financial Health Report`, 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Generated for: ${user.full_name || user.email}`, 14, 32);
    
    // ⭐ FIXED: Injecting real profile data
    doc.text(`Financial Score: ${profileData.financial_score || 'N/A'}`, 14, 42);
    doc.text(`Debt-to-Income (DTI): ${profileData.dti || 'N/A'}%`, 14, 50);
    doc.text(`Risk Level: ${profileData.risk_level || 'N/A'}`, 14, 58);

    // ⭐ FIXED: Mapping real dynamic loans into the autoTable
    const tableData = loans && loans.length > 0 
        ? loans.map(loan => [
            loan.lender,
            loan.loan_type,
            `$${loan.amount}`,
            `$${loan.remaining_balance}`
        ])
        : [['No loans found', '-', '-', '-']];

    doc.autoTable({
        startY: 70,
        head: [['Lender', 'Type', 'Total Amount', 'Remaining Balance']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] } // Matches your Blue Theme (#2563eb)
    });

    // Save with dynamic filename
    const fileName = `${user.full_name ? user.full_name.replace(/\s+/g, '_') : 'User'}_Report.pdf`;
    doc.save(fileName);
};