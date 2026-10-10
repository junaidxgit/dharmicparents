const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
    console.log('🚀 Launching browser...');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });
    
    const page = await browser.newPage();
    
    // Generate the full 47-page guide
    const htmlPath = path.join(__dirname, 'full-transformation-guide.html');
    const pdfPath = path.join(__dirname, 'public', 'Dharmic-Father-Son-Transformation-Guide-Complete.pdf');
    
    console.log('📄 Loading full transformation guide HTML...');
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle0'
    });
    
    // Wait for fonts to load (especially Devanagari fonts for Sanskrit text)
    console.log('⏳ Waiting for fonts to load...');
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(resolve => setTimeout(resolve, 3000)); // Extra time for Google Fonts
    
    console.log('🖨️  Generating 47-page PDF...');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '25mm',
            right: '20mm',
            bottom: '25mm',
            left: '20mm'
        }
    });
    
    console.log('✅ 47-page PDF generated successfully!');
    console.log(`📍 Location: ${pdfPath}`);
    
    // Check file size
    const stats = fs.statSync(pdfPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 File size: ${fileSizeInKB} KB (${fileSizeInMB} MB)`);
    
    // Also generate the summary package
    console.log('\n🚀 Generating summary package...');
    const summaryHtmlPath = path.join(__dirname, 'dharmic-parents-package.html');
    const summaryPdfPath = path.join(__dirname, 'public', 'Dharmic-Parents-Transformation-Package.pdf');
    
    const page2 = await browser.newPage();
    await page2.goto(`file://${summaryHtmlPath}`, { waitUntil: 'networkidle0' });
    await page2.pdf({
        path: summaryPdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
    });
    
    const stats2 = fs.statSync(summaryPdfPath);
    console.log(`✅ Summary package also generated: ${(stats2.size / 1024).toFixed(2)} KB`);
    
    await browser.close();
}

generatePDF().catch(error => {
    console.error('❌ PDF generation failed:', error);
    process.exit(1);
});
