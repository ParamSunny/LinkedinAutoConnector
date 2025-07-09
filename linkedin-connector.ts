import { chromium } from 'playwright';

async function linkedinAutomation() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // ✅ Login
    await page.goto('https://www.linkedin.com/login');
    await page.fill('#username', 'YOUR_USERNAME/EMIAL');
    await page.fill('#password', 'YOUR_PASSWORD');
    await page.click('button[type="submit"]');
    console.log('✅ Logged into LinkedIn');

    // ✅ Search
    const searchKeyword = 'YOUR_KEYWORD';
    await page.waitForSelector('input[placeholder="Search"]');
    await page.fill('input[placeholder="Search"]', searchKeyword);
    await page.keyboard.press('Enter');
    console.log(`🔍 Searched for: ${searchKeyword}`);

    // ✅ Filter by People
    await page.waitForTimeout(3000);
    const peopleTab = await page.$('button:has-text("People")');
    if (peopleTab) {
        await peopleTab.click();
        console.log('✅ Clicked People Tab');
    } else {
        console.log('❌ People Tab not found.');
        return;
    }

    await page.waitForTimeout(5000);

    // ✅ Auto Connection Sender with Pagination & Scroll
    let connectCount = 0;
    const maxConnections = 5;

    while (connectCount < maxConnections) {
        const connectButtons = await page.$$('button:has-text("Connect")');
        console.log(`📝 Found ${connectButtons.length} Connect buttons on this page.`);

        for (const button of connectButtons) {
            if (connectCount >= maxConnections) break;
            try {
                await button.click();
                await page.waitForTimeout(1000);
                const sendBtn = await page.$('button:has-text("Send")');
                if (sendBtn) {
                    await sendBtn.click();
                    console.log('✅ Connection request sent.');
                    connectCount++;
                    await page.waitForTimeout(1500);
                }
            } catch (err) {
                console.log('⚠️ Error sending connection:', err);
            }
        }

        console.log(`🔗 Total connections sent so far: ${connectCount}`);

        if (connectCount >= maxConnections) break;

        // ✅ Scroll down before clicking Next
        await page.mouse.wheel(0, 3000);
        await page.waitForTimeout(3000);

        const nextButton = await page.$('button[aria-label="Next"]');
        if (nextButton) {
            const isDisabled = await nextButton.getAttribute('disabled');
            if (!isDisabled) {
                console.log('➡️ Clicking Next Page...');
                await nextButton.click();
                await page.waitForTimeout(5000); // Wait for next page to load profiles
            } else {
                console.log('🚫 No more pages (Next button disabled)');
                break;
            }
        } else {
            console.log('🚫 Next button not found, possibly last page.');
            break;
        }
    }

    console.log(`🚀 Total Connections Sent: ${connectCount}`);
    await browser.close();
}

linkedinAutomation();
