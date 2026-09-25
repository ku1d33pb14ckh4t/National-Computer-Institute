        // ================== SECURITY: DISABLE RIGHT CLICK, F12, DEV TOOLS ==================
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && e.shiftKey && (
                e.key === 'I' || e.key === 'i' ||
                e.key === 'J' || e.key === 'j' ||
                e.key === 'C' || e.key === 'c' ||
                e.key === 'K' || e.key === 'k'
            )) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && (e.key === 'P' || e.key === 'p')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.ctrlKey && (e.key === 'A' || e.key === 'a')) {
                const tag = (e.target.tagName || '').toLowerCase();
                if (tag !== 'input' && tag !== 'textarea') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
            if (e.ctrlKey && (e.key === 'C' || e.key === 'c')) {
                const tag = (e.target.tagName || '').toLowerCase();
                if (tag !== 'input' && tag !== 'textarea') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
            if (e.ctrlKey && e.shiftKey && (e.key === 'Delete' || e.key === 'Backspace')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);

        document.addEventListener('copy', function(e) {
            const tag = (e.target.tagName || '').toLowerCase();
            if (tag !== 'input' && tag !== 'textarea') {
                e.preventDefault();
                return false;
            }
        });
        document.addEventListener('cut', function(e) {
            const tag = (e.target.tagName || '').toLowerCase();
            if (tag !== 'input' && tag !== 'textarea') {
                e.preventDefault();
                return false;
            }
        });

        document.addEventListener('selectstart', function(e) {
            const tag = (e.target.tagName || '').toLowerCase();
            if (tag !== 'input' && tag !== 'textarea') {
                e.preventDefault();
                return false;
            }
        });

        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });

        document.addEventListener('drop', function(e) {
            e.preventDefault();
            return false;
        });

        // Detect devtools open (silent) - reload/blank page if devtools detected
        (function() {
            const threshold = 160;
            let devtoolsOpen = false;
            const check = function() {
                const widthDiff = window.outerWidth - window.innerWidth;
                const heightDiff = window.outerHeight - window.innerHeight;
                if (widthDiff > threshold || heightDiff > threshold) {
                    if (!devtoolsOpen) {
                        devtoolsOpen = true;
                        try {
                            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#1a237e;color:#fff;font-family:sans-serif;font-size:24px;text-align:center;padding:30px;">🔒 Security Alert: Developer Tools Detected. Please close DevTools and reload the page.</div>';
                            clearInterval(interval);
                        } catch (e) {}
                    }
                } else {
                    devtoolsOpen = false;
                }
            };
            const interval = setInterval(check, 800);
        })();
        // =====================================================================================

        // ================== SECURITY: FORCE FULLSCREEN DURING EXAM ==================
        let examActive = false; // Jab tak exam finish na ho, ye true rahega

        // Fullscreen se bahar jaane par wapas force karo (jab tak exam active hai)
        document.addEventListener('fullscreenchange', function() {
            if (examActive && !document.fullscreenElement) {
                // User ne fullscreen exit kiya - wapas force karo
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen().catch(() => {});
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            }
        });

        document.addEventListener('webkitfullscreenchange', function() {
            if (examActive && !document.webkitFullscreenElement) {
                const elem = document.documentElement;
                if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
            }
        });

        // ESC key se fullscreen exit na ho (jab tak exam active hai)
        document.addEventListener('keydown', function(e) {
            if (examActive && (e.key === 'Escape' || e.keyCode === 27)) {
                e.preventDefault();
                // Wapas fullscreen force karo
                setTimeout(() => {
                    const elem = document.documentElement;
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen().catch(() => {});
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen();
                    }
                }, 100);
                return false;
            }
        }, true);
        // =====================================================================================

        // ================== CONFIGURATION ==================
        const TELEGRAM_BOT_TOKEN = '8881091384:AAEXbGoNDiGDiIo3LKSV2lNs0k-Z9orOkmo';
        const TELEGRAM_CHAT_ID = '8492749081';
        // ====================================================

        // Questions Data
        const questions = [
            {
                "id": 1,
                "text": "Tally Prime में कंपनी बनाने के लिए कौन सी शॉर्टकट key use होती है? / Which shortcut key is used to create a company in Tally Prime?",
                "options": ["F1", "Alt + F3", "Ctrl + C", "Alt + F1"],
                "correctAnswer": 1,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 2,
                "text": "Tally Prime में कंपनी की information बदलने के लिए कौन सा option use करते हैं? / Which option is used to alter company information in Tally Prime?",
                "options": ["Alt + F3", "F3", "Ctrl + F3", "Alt + C"],
                "correctAnswer": 0,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 3,
                "text": "Tally Prime में voucher save/accept करने के लिए कौन सी key दबाते हैं? / Which key is used to accept/save a voucher in Tally Prime?",
                "options": ["Ctrl + A", "Ctrl + S", "Enter", "Alt + A"],
                "correctAnswer": 0,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 4,
                "text": "Tally Prime में Features को activate करने के लिए कौन सी key use होती है? / Which key is used to activate Features in Tally Prime?",
                "options": ["F11", "F12", "Alt + F11", "Ctrl + F11"],
                "correctAnswer": 0,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 5,
                "text": "Tally Prime में Configuration settings के लिए कौन सी key use होती है? / Which key is used for Configuration settings in Tally Prime?",
                "options": ["F11", "F12", "Alt + F12", "Ctrl + F12"],
                "correctAnswer": 1,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 6,
                "text": "Tally Prime में Company को delete करने का option कहाँ मिलता है? / Where is the option to delete a company in Tally Prime?",
                "options": ["Alt + F3 > Delete", "F3 > Delete", "Ctrl + D", "Alt + D"],
                "correctAnswer": 0,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 7,
                "text": "Tally Prime में एक साथ कितनी companies open की जा सकती हैं? / How many companies can be opened at a time in Tally Prime?",
                "options": ["1", "2", "5", "Multiple"],
                "correctAnswer": 3,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 8,
                "text": "Tally Prime में data की security के लिए कौन सा feature use होता है? / Which feature is used for data security in Tally Prime?",
                "options": ["Security Control", "Tally Vault", "Password", "All of these"],
                "correctAnswer": 3,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 9,
                "text": "Tally Prime में Financial Year की start date कौन decide करता है? / Who decides the start date of Financial Year in Tally Prime?",
                "options": ["User", "Tally", "Government", "Company Act"],
                "correctAnswer": 0,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 10,
                "text": "Tally Prime में Company creation के समय कौन सी details जरूरी होती हैं? / Which details are mandatory while creating a company in Tally Prime?",
                "options": ["Name", "Financial Year", "Address", "Both a & b"],
                "correctAnswer": 3,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 11,
                "text": "Tally Prime में 'Save' करने के लिए कौन सी key use होती है? / Which key is used to 'Save' in Tally Prime?",
                "options": ["Ctrl + S", "Ctrl + A", "F2", "Alt + S"],
                "correctAnswer": 1,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 12,
                "text": "Tally Prime में 'Quit' करने के लिए कौन सी key use होती है? / Which key is used to 'Quit' in Tally Prime?",
                "options": ["Esc", "Ctrl + Q", "Alt + Q", "Ctrl + Esc"],
                "correctAnswer": 1,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 13,
                "text": "Tally Prime में menu से बाहर निकलने के लिए कौन सी key use होती है? / Which key is used to exit from a menu in Tally Prime?",
                "options": ["Enter", "Esc", "Ctrl + E", "Alt + E"],
                "correctAnswer": 1,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 14,
                "text": "Tally Prime में 'Back' जाने के लिए कौन सी key use होती है? / Which key is used to go 'Back' in Tally Prime?",
                "options": ["Esc", "Backspace", "Ctrl + B", "Alt + B"],
                "correctAnswer": 1,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 15,
                "text": "Tally Prime में Help के लिए कौन सी key use होती है? / Which key is used for Help in Tally Prime?",
                "options": ["F1", "F2", "F3", "F4"],
                "correctAnswer": 0,
                "topic": "Basics & Company Creation"
            },
            {
                "id": 16,
                "text": "Tally Prime में कितने pre-defined groups होते हैं? / How many pre-defined groups are there in Tally Prime?",
                "options": ["28", "30", "15", "19"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 17,
                "text": "Capital account किस group में आता है? / Capital account falls under which group?",
                "options": ["Assets", "Liabilities", "Capital Account", "Income"],
                "correctAnswer": 2,
                "topic": "Accounting & Groups"
            },
            {
                "id": 18,
                "text": "Drawings account किस group में आता है? / Drawings account falls under which group?",
                "options": ["Capital Account", "Assets", "Liabilities", "Expenses"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 19,
                "text": "Assets = Liabilities + ?",
                "options": ["Capital", "Drawings", "Expenses", "Income"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 20,
                "text": "Tally Prime में Ledger create करने के लिए कौन सा path use होता है? / Which path is used to create a Ledger in Tally Prime?",
                "options": ["Gateway > Accounts > Ledger", "Gateway > Master > Ledger", "Gateway > Create > Ledger", "Gateway > Accounts Info > Ledgers > Create"],
                "correctAnswer": 3,
                "topic": "Accounting & Groups"
            },
            {
                "id": 21,
                "text": "Tally Prime में Group create करने के लिए कौन सा option use होता है? / Which option is used to create a Group in Tally Prime?",
                "options": ["Accounts Info > Groups > Create", "Master > Groups > Create", "Gateway > Create > Group", "Accounts > Group > Create"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 22,
                "text": "Tally Prime में किसी Ledger की details देखने के लिए कौन सा option use होता है? / Which option is used to view details of a Ledger in Tally Prime?",
                "options": ["Display > Ledger", "Accounts Info > Ledger", "Display > Account Books > Ledger", "Both a & c"],
                "correctAnswer": 2,
                "topic": "Accounting & Groups"
            },
            {
                "id": 23,
                "text": "Tally Prime में Contra voucher किस लिए use होता है? / Contra voucher is used for which purpose in Tally Prime?",
                "options": ["Cash to Bank", "Bank to Cash", "Both a & b", "Sales"],
                "correctAnswer": 2,
                "topic": "Accounting & Groups"
            },
            {
                "id": 24,
                "text": "Tally Prime में Payment voucher किस लिए use होता है? / Payment voucher is used for which purpose in Tally Prime?",
                "options": ["Cash payment", "Bank payment", "Both a & b", "Sales"],
                "correctAnswer": 2,
                "topic": "Accounting & Groups"
            },
            {
                "id": 25,
                "text": "Tally Prime में Receipt voucher किस लिए use होता है? / Receipt voucher is used for which purpose in Tally Prime?",
                "options": ["Cash receipt", "Bank receipt", "Both a & b", "Purchase"],
                "correctAnswer": 2,
                "topic": "Accounting & Groups"
            },
            {
                "id": 26,
                "text": "Tally Prime में Journal voucher किस लिए use होता है? / Journal voucher is used for which purpose in Tally Prime?",
                "options": ["Credit sales", "Credit purchase", "Adjustment entries", "All of these"],
                "correctAnswer": 2,
                "topic": "Accounting & Groups"
            },
            {
                "id": 27,
                "text": "Tally Prime में Sales voucher किस लिए use होता है? / Sales voucher is used for which purpose in Tally Prime?",
                "options": ["Credit sales", "Cash sales", "Both a & b", "Purchase"],
                "correctAnswer": 2,
                "topic": "Accounting & Groups"
            },
            {
                "id": 28,
                "text": "Tally Prime में Purchase voucher किस लिए use होता है? / Purchase voucher is used for which purpose in Tally Prime?",
                "options": ["Credit purchase", "Cash purchase", "Both a & b", "Sales"],
                "correctAnswer": 2,
                "topic": "Accounting & Groups"
            },
            {
                "id": 29,
                "text": "Tally Prime में Debit note किस लिए use होता है? / Debit note is used for which purpose in Tally Prime?",
                "options": ["Purchase return", "Sales return", "Both a & b", "None"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 30,
                "text": "Tally Prime में Credit note किस लिए use होता है? / Credit note is used for which purpose in Tally Prime?",
                "options": ["Purchase return", "Sales return", "Both a & b", "None"],
                "correctAnswer": 1,
                "topic": "Accounting & Groups"
            },
            {
                "id": 31,
                "text": "Tally Prime में 'Post-dated voucher' क्या होता है? / What is a 'Post-dated voucher' in Tally Prime?",
                "options": ["Future date voucher", "Past date voucher", "Current date voucher", "None"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 32,
                "text": "Tally Prime में 'Optional voucher' क्या होता है? / What is an 'Optional voucher' in Tally Prime?",
                "options": ["Not affecting books", "Affecting books", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 33,
                "text": "Tally Prime में 'Regular voucher' क्या होता है? / What is a 'Regular voucher' in Tally Prime?",
                "options": ["Affecting books", "Not affecting books", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 34,
                "text": "Tally Prime में 'Memorandum voucher' क्या होता है? / What is a 'Memorandum voucher' in Tally Prime?",
                "options": ["Not affecting books", "Affecting books", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 35,
                "text": "Tally Prime में 'Reversing Journal' क्या होता है? / What is 'Reversing Journal' in Tally Prime?",
                "options": ["Auto reverse entry", "Manual entry", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Accounting & Groups"
            },
            {
                "id": 36,
                "text": "Tally Prime में Stock Group create करने के लिए कौन सा path use होता है? / Which path is used to create a Stock Group in Tally Prime?",
                "options": ["Inventory Info > Stock Groups > Create", "Inventory > Stock Group > Create", "Gateway > Stock > Group", "None"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 37,
                "text": "Tally Prime में Stock Item create करने के लिए कौन सा path use होता है? / Which path is used to create a Stock Item in Tally Prime?",
                "options": ["Inventory Info > Stock Items > Create", "Inventory > Stock Item > Create", "Gateway > Stock > Item", "None"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 38,
                "text": "Tally Prime में Unit of Measure create करने के लिए कौन सा path use होता है? / Which path is used to create a Unit of Measure in Tally Prime?",
                "options": ["Inventory Info > Units > Create", "Inventory > Unit > Create", "Gateway > Stock > Unit", "None"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 39,
                "text": "Tally Prime में Godown create करने के लिए कौन सा path use होता है? / Which path is used to create a Godown in Tally Prime?",
                "options": ["Inventory Info > Godowns > Create", "Inventory > Godown > Create", "Gateway > Stock > Godown", "None"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 40,
                "text": "Tally Prime में Stock Journal किस लिए use होता है? / Stock Journal is used for which purpose in Tally Prime?",
                "options": ["Stock transfer", "Production", "Both a & b", "Sales"],
                "correctAnswer": 2,
                "topic": "Inventory & Stock"
            },
            {
                "id": 41,
                "text": "Tally Prime में Physical Stock voucher किस लिए use होता है? / Physical Stock voucher is used for which purpose in Tally Prime?",
                "options": ["Actual stock entry", "Stock transfer", "Production", "Sales"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 42,
                "text": "Tally Prime में 'Stock Summary' कहाँ मिलता है? / Where is 'Stock Summary' available in Tally Prime?",
                "options": ["Display > Stock Summary", "Inventory > Stock Summary", "Gateway > Stock > Summary", "None"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 43,
                "text": "Tally Prime में 'Godown Summary' कहाँ मिलता है? / Where is 'Godown Summary' available in Tally Prime?",
                "options": ["Display > Godown Summary", "Inventory > Godown Summary", "Gateway > Stock > Godown", "None"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 44,
                "text": "Tally Prime में 'Stock Ageing Analysis' क्या दिखाता है? / What does 'Stock Ageing Analysis' show in Tally Prime?",
                "options": ["Stock age", "Stock value", "Stock quantity", "All"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 45,
                "text": "Tally Prime में 'Stock Query' कहाँ मिलता है? / Where is 'Stock Query' available in Tally Prime?",
                "options": ["Display > Stock Query", "Inventory > Stock Query", "Gateway > Stock > Query", "None"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 46,
                "text": "Tally Prime में 'Reorder Level' क्या होता है? / What is 'Reorder Level' in Tally Prime?",
                "options": ["Minimum stock level", "Maximum stock level", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 47,
                "text": "Tally Prime में 'Batch-wise details' किस feature में activate होती है? / In which feature are 'Batch-wise details' activated in Tally Prime?",
                "options": ["F11 > Inventory", "F11 > Accounting", "F12 > Inventory", "F12 > Accounting"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 48,
                "text": "Tally Prime में 'Cost Centre' किस लिए use होता है? / Cost Centre is used for which purpose in Tally Prime?",
                "options": ["Cost allocation", "Profit centre", "Both a & b", "None"],
                "correctAnswer": 2,
                "topic": "Inventory & Stock"
            },
            {
                "id": 49,
                "text": "Tally Prime में 'Cost Category' किस लिए use होता है? / Cost Category is used for which purpose in Tally Prime?",
                "options": ["Cost allocation", "Cost centre grouping", "Both", "None"],
                "correctAnswer": 1,
                "topic": "Inventory & Stock"
            },
            {
                "id": 50,
                "text": "Tally Prime में 'Budget' किस लिए use होता है? / Budget is used for which purpose in Tally Prime?",
                "options": ["Planning", "Control", "Both a & b", "None"],
                "correctAnswer": 2,
                "topic": "Inventory & Stock"
            },
            {
                "id": 51,
                "text": "Tally Prime में 'Scenario' किस लिए use होता है? / Scenario is used for which purpose in Tally Prime?",
                "options": ["What-if analysis", "Budget", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 52,
                "text": "Tally Prime में 'Interest Calculation' किस feature में activate होता है? / In which feature is 'Interest Calculation' activated in Tally Prime?",
                "options": ["F11 > Accounting", "F11 > Inventory", "F12 > Accounting", "F12 > Inventory"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 53,
                "text": "Tally Prime में 'Bill-wise details' किस feature में activate होता है? / In which feature is 'Bill-wise details' activated in Tally Prime?",
                "options": ["F11 > Accounting", "F11 > Inventory", "F12 > Accounting", "F12 > Inventory"],
                "correctAnswer": 0,
                "topic": "Inventory & Stock"
            },
            {
                "id": 54,
                "text": "Tally Prime में 'Multiple Price Level' किस feature में activate होता है? / In which feature is 'Multiple Price Level' activated in Tally Prime?",
                "options": ["F11 > Accounting", "F11 > Inventory", "F12 > Accounting", "F12 > Inventory"],
                "correctAnswer": 1,
                "topic": "Inventory & Stock"
            },
            {
                "id": 55,
                "text": "Tally Prime में 'Additional Cost' किस feature में activate होता है? / In which feature is 'Additional Cost' activated in Tally Prime?",
                "options": ["F11 > Accounting", "F11 > Inventory", "F12 > Accounting", "F12 > Inventory"],
                "correctAnswer": 1,
                "topic": "Inventory & Stock"
            },
            {
                "id": 56,
                "text": "Tally Prime में GST activate करने के लिए कौन सा path use होता है? / Which path is used to activate GST in Tally Prime?",
                "options": ["F11 > Statutory & Taxation", "F12 > GST", "Alt + G", "Ctrl + G"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 57,
                "text": "Tally Prime में GSTIN क्या होता है? / What is GSTIN in Tally Prime?",
                "options": ["GST Identification Number", "GST Invoice Number", "GST Item Number", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 58,
                "text": "Tally Prime में CGST का full form क्या है? / What is the full form of CGST in Tally Prime?",
                "options": ["Central Goods and Services Tax", "Central GST", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 59,
                "text": "Tally Prime में SGST का full form क्या है? / What is the full form of SGST in Tally Prime?",
                "options": ["State Goods and Services Tax", "State GST", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 60,
                "text": "Tally Prime में IGST का full form क्या है? / What is the full form of IGST in Tally Prime?",
                "options": ["Integrated Goods and Services Tax", "Integrated GST", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 61,
                "text": "Tally Prime में GST rate कितने प्रकार के होते हैं? / How many types of GST rates are there in Tally Prime?",
                "options": ["3", "4", "5", "6"],
                "correctAnswer": 2,
                "topic": "GST & Taxation"
            },
            {
                "id": 62,
                "text": "Tally Prime में GST Return कहाँ से file होता है? / From where is GST Return filed in Tally Prime?",
                "options": ["Display > GST", "Gateway > GST", "Both", "None"],
                "correctAnswer": 1,
                "topic": "GST & Taxation"
            },
            {
                "id": 63,
                "text": "Tally Prime में GSTR-1 क्या होता है? / What is GSTR-1 in Tally Prime?",
                "options": ["Outward supplies", "Inward supplies", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 64,
                "text": "Tally Prime में GSTR-2 क्या होता है? / What is GSTR-2 in Tally Prime?",
                "options": ["Outward supplies", "Inward supplies", "Both", "None"],
                "correctAnswer": 1,
                "topic": "GST & Taxation"
            },
            {
                "id": 65,
                "text": "Tally Prime में GSTR-3B क्या होता है? / What is GSTR-3B in Tally Prime?",
                "options": ["Monthly return", "Annual return", "Quarterly return", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 66,
                "text": "Tally Prime में TDS का full form क्या है? / What is the full form of TDS in Tally Prime?",
                "options": ["Tax Deducted at Source", "Tax Deposit at Source", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 67,
                "text": "Tally Prime में TCS का full form क्या है? / What is the full form of TCS in Tally Prime?",
                "options": ["Tax Collected at Source", "Tax Deducted at Source", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 68,
                "text": "Tally Prime में TDS activate करने के लिए कौन सा path use होता है? / Which path is used to activate TDS in Tally Prime?",
                "options": ["F11 > Statutory & Taxation", "F12 > TDS", "Alt + T", "Ctrl + T"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 69,
                "text": "Tally Prime में TCS activate करने के लिए कौन सा path use होता है? / Which path is used to activate TCS in Tally Prime?",
                "options": ["F11 > Statutory & Taxation", "F12 > TCS", "Alt + T", "Ctrl + T"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 70,
                "text": "Tally Prime में VAT किस देश में use होता है? / In which country is VAT used in Tally Prime?",
                "options": ["India", "UAE", "Both", "None"],
                "correctAnswer": 2,
                "topic": "GST & Taxation"
            },
            {
                "id": 71,
                "text": "Tally Prime में Excise Duty किस लिए use होता है? / Excise Duty is used for which purpose in Tally Prime?",
                "options": ["Manufacturing", "Sales", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 72,
                "text": "Tally Prime में Service Tax किस लिए use होता है? / Service Tax is used for which purpose in Tally Prime?",
                "options": ["Services", "Goods", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 73,
                "text": "Tally Prime में 'GST Reconciliation' क्या होता है? / What is 'GST Reconciliation' in Tally Prime?",
                "options": ["Matching GST data", "Filing GST", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 74,
                "text": "Tally Prime में 'e-Way Bill' किस लिए use होता है? / e-Way Bill is used for which purpose in Tally Prime?",
                "options": ["Goods transport", "Sales", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 75,
                "text": "Tally Prime में 'e-Invoice' किस लिए use होता है? / e-Invoice is used for which purpose in Tally Prime?",
                "options": ["Invoice generation", "GST filing", "Both", "None"],
                "correctAnswer": 0,
                "topic": "GST & Taxation"
            },
            {
                "id": 76,
                "text": "Tally Prime में Payroll activate करने के लिए कौन सा path use होता है? / Which path is used to activate Payroll in Tally Prime?",
                "options": ["F11 > Payroll", "F12 > Payroll", "Alt + P", "Ctrl + P"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 77,
                "text": "Tally Prime में Employee create करने के लिए कौन सा path use होता है? / Which path is used to create an Employee in Tally Prime?",
                "options": ["Payroll Info > Employees > Create", "Payroll > Employee > Create", "Gateway > Payroll > Employee", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 78,
                "text": "Tally Prime में Pay Head create करने के लिए कौन सा path use होता है? / Which path is used to create a Pay Head in Tally Prime?",
                "options": ["Payroll Info > Pay Heads > Create", "Payroll > Pay Head > Create", "Gateway > Payroll > Pay Head", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 79,
                "text": "Tally Prime में Attendance voucher किस लिए use होता है? / Attendance voucher is used for which purpose in Tally Prime?",
                "options": ["Attendance entry", "Salary entry", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 80,
                "text": "Tally Prime में Payroll voucher किस लिए use होता है? / Payroll voucher is used for which purpose in Tally Prime?",
                "options": ["Salary payment", "Attendance", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 81,
                "text": "Tally Prime में 'Pay Slip' कहाँ मिलता है? / Where is 'Pay Slip' available in Tally Prime?",
                "options": ["Display > Pay Slip", "Payroll > Pay Slip", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 82,
                "text": "Tally Prime में 'Payroll Register' कहाँ मिलता है? / Where is 'Payroll Register' available in Tally Prime?",
                "options": ["Display > Payroll Register", "Payroll > Register", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 83,
                "text": "Tally Prime में 'Trial Balance' कहाँ मिलता है? / Where is 'Trial Balance' available in Tally Prime?",
                "options": ["Display > Trial Balance", "Balance Sheet > Trial Balance", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 84,
                "text": "Tally Prime में 'Balance Sheet' कहाँ मिलता है? / Where is 'Balance Sheet' available in Tally Prime?",
                "options": ["Display > Balance Sheet", "Gateway > Balance Sheet", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 85,
                "text": "Tally Prime में 'Profit & Loss Account' कहाँ मिलता है? / Where is 'Profit & Loss Account' available in Tally Prime?",
                "options": ["Display > Profit & Loss A/c", "Gateway > P&L", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 86,
                "text": "Tally Prime में 'Cash Flow Projection' कहाँ मिलता है? / Where is 'Cash Flow Projection' available in Tally Prime?",
                "options": ["Display > Cash Flow", "Display > Cash Flow Projection", "Both", "None"],
                "correctAnswer": 1,
                "topic": "Payroll & Reports"
            },
            {
                "id": 87,
                "text": "Tally Prime में 'Fund Flow' कहाँ मिलता है? / Where is 'Fund Flow' available in Tally Prime?",
                "options": ["Display > Fund Flow", "Display > Fund Flow Analysis", "Both", "None"],
                "correctAnswer": 1,
                "topic": "Payroll & Reports"
            },
            {
                "id": 88,
                "text": "Tally Prime में 'Ratio Analysis' कहाँ मिलता है? / Where is 'Ratio Analysis' available in Tally Prime?",
                "options": ["Display > Ratio Analysis", "Display > Analysis", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Payroll & Reports"
            },
            {
                "id": 89,
                "text": "Tally Prime में 'Day Book' कहाँ मिलता है? / Where is 'Day Book' available in Tally Prime?",
                "options": ["Display > Day Book", "Display > Account Books > Day Book", "Both", "None"],
                "correctAnswer": 1,
                "topic": "Payroll & Reports"
            },
            {
                "id": 90,
                "text": "Tally Prime में 'Sales Register' कहाँ मिलता है? / Where is 'Sales Register' available in Tally Prime?",
                "options": ["Display > Sales Register", "Display > Account Books > Sales Register", "Both", "None"],
                "correctAnswer": 1,
                "topic": "Payroll & Reports"
            },
            {
                "id": 91,
                "text": "Tally Prime में 'Multi-currency' किस feature में activate होता है? / In which feature is 'Multi-currency' activated in Tally Prime?",
                "options": ["F11 > Accounting", "F11 > Inventory", "F12 > Accounting", "F12 > Inventory"],
                "correctAnswer": 0,
                "topic": "Advanced & Miscellaneous"
            },
            {
                "id": 92,
                "text": "Tally Prime में 'Bank Reconciliation' किस लिए use होता है? / Bank Reconciliation is used for which purpose in Tally Prime?",
                "options": ["Bank matching", "Cash matching", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Advanced & Miscellaneous"
            },
            {
                "id": 93,
                "text": "Tally Prime में 'Cheque Printing' किस लिए use होता है? / Cheque Printing is used for which purpose in Tally Prime?",
                "options": ["Cheque generation", "Bank entry", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Advanced & Miscellaneous"
            },
            {
                "id": 94,
                "text": "Tally Prime में 'Data Backup' कैसे करते हैं? / How is 'Data Backup' done in Tally Prime?",
                "options": ["Ctrl + B", "Alt + B", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Advanced & Miscellaneous"
            },
            {
                "id": 95,
                "text": "Tally Prime में 'Data Restore' कैसे करते हैं? / How is 'Data Restore' done in Tally Prime?",
                "options": ["Ctrl + R", "Alt + R", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Advanced & Miscellaneous"
            },
            {
                "id": 96,
                "text": "Tally Prime में 'Import Data' किस format में होता है? / In which format is 'Import Data' done in Tally Prime?",
                "options": ["XML", "CSV", "Both", "None"],
                "correctAnswer": 2,
                "topic": "Advanced & Miscellaneous"
            },
            {
                "id": 97,
                "text": "Tally Prime में 'Export Data' किस format में होता है? / In which format is 'Export Data' done in Tally Prime?",
                "options": ["XML", "CSV", "PDF", "All of these"],
                "correctAnswer": 3,
                "topic": "Advanced & Miscellaneous"
            },
            {
                "id": 98,
                "text": "Tally Prime में 'E-mail' किस लिए use होता है? / E-mail is used for which purpose in Tally Prime?",
                "options": ["Sending reports", "Sending invoices", "Both", "None"],
                "correctAnswer": 2,
                "topic": "Advanced & Miscellaneous"
            },
            {
                "id": 99,
                "text": "Tally Prime में 'Print' करने के लिए कौन सी key use होती है? / Which key is used for 'Print' in Tally Prime?",
                "options": ["Ctrl + P", "Alt + P", "Both", "None"],
                "correctAnswer": 0,
                "topic": "Advanced & Miscellaneous"
            },
            {
                "id": 100,
                "text": "Tally Prime में 'Security Control' किस लिए use होता है? / Security Control is used for which purpose in Tally Prime?",
                "options": ["User access", "Data security", "Both", "None"],
                "correctAnswer": 2,
                "topic": "Advanced & Miscellaneous"
            }
        ];

        // Exam state
        const examState = {
            currentQuestion: 0,
            answers: new Array(questions.length).fill(null),
            timeRemaining: 5400,
            timerInterval: null,
            userName: "",
            userEmail: "",
            userPhone: "",
            startTime: null,
            endTime: null
        };

        // Start exam and request fullscreen
        function startExam() {
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value || "Not Provided";
            
            if (!fullName || !phone) {
                alert('Please fill in all required fields (Name and Phone Number)');
                return;
            }
            
            examState.userName = fullName;
            examState.userEmail = email;
            examState.userPhone = phone;
            
            document.getElementById('userNameDisplay').innerHTML = `<i class="fas fa-user"></i> ${fullName}`;
            document.getElementById('userEmailDisplay').innerHTML = `<i class="fas fa-envelope"></i> ${email}`;
            document.getElementById('userPhoneDisplay').innerHTML = `<i class="fas fa-phone"></i> ${phone}`;
            
            document.getElementById('reportUserName').textContent = fullName;
            document.getElementById('reportUserEmail').textContent = email;
            document.getElementById('reportUserPhone').textContent = phone;
            
            document.getElementById('reportExamId').textContent = `NCI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
            
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('examScreen').style.display = 'block';
            
            // ✅ EXAM ACTIVE: Force fullscreen
            examActive = true;
            
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(err => console.log('Fullscreen error:', err));
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            
            window.scrollTo(0, 0);
            
            initExam();
            loadQuestion();
        }

        // Initialize the exam
        function initExam() {
            generateQuestionIndicators();
            updateProgress();
            startTimer();
            examState.startTime = new Date();
        }

        // Generate question indicators
        function generateQuestionIndicators() {
            const grid = document.getElementById('questionGrid');
            grid.innerHTML = '';
            
            questions.forEach((question, index) => {
                const indicator = document.createElement('div');
                indicator.className = 'question-indicator pending';
                if (index === examState.currentQuestion) {
                    indicator.classList.add('current');
                }
                indicator.textContent = index + 1;
                indicator.onclick = () => goToQuestionNumber(index);
                grid.appendChild(indicator);
            });
            
            const summaryGrid = document.getElementById('summaryGrid');
            summaryGrid.innerHTML = '';
            
            questions.forEach((question, index) => {
                const indicator = document.createElement('div');
                indicator.className = 'question-indicator pending';
                indicator.textContent = index + 1;
                indicator.onclick = () => {
                    goToQuestionNumber(index);
                    closeSummaryPanel();
                };
                summaryGrid.appendChild(indicator);
            });
        }

        // Update progress indicators
        function updateProgress() {
            const answered = examState.answers.filter(answer => answer !== null).length;
            const pending = questions.length - answered;
            const progressPercent = Math.round((answered / questions.length) * 100);
            
            document.getElementById('answeredCount').textContent = answered;
            document.getElementById('pendingCount').textContent = pending;
            document.getElementById('progressPercent').textContent = progressPercent;
            
            document.getElementById('progressFill').style.width = `${progressPercent}%`;
            
            const indicators = document.querySelectorAll('#questionGrid .question-indicator');
            indicators.forEach((indicator, index) => {
                indicator.className = 'question-indicator';
                
                if (examState.answers[index] !== null) {
                    indicator.classList.add('answered');
                } else {
                    indicator.classList.add('pending');
                }
                
                if (index === examState.currentQuestion) {
                    indicator.classList.add('current');
                }
            });
            
            const summaryIndicators = document.querySelectorAll('#summaryGrid .question-indicator');
            summaryIndicators.forEach((indicator, index) => {
                indicator.className = 'question-indicator';
                
                if (examState.answers[index] !== null) {
                    indicator.classList.add('answered');
                } else {
                    indicator.classList.add('pending');
                }
            });
        }

        // Start the exam timer
        function startTimer() {
            updateTimerDisplay();
            
            examState.timerInterval = setInterval(() => {
                examState.timeRemaining--;
                updateTimerDisplay();
                
                if (examState.timeRemaining <= 0) {
                    clearInterval(examState.timerInterval);
                    finishExam();
                }
            }, 1000);
        }

        // Update timer display
        function updateTimerDisplay() {
            const hours = Math.floor(examState.timeRemaining / 3600);
            const minutes = Math.floor((examState.timeRemaining % 3600) / 60);
            const seconds = examState.timeRemaining % 60;
            
            document.getElementById('timer').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Select an option
        function selectOption(element) {
            const options = document.querySelectorAll('.option');
            options.forEach(opt => opt.classList.remove('selected'));
            element.classList.add('selected');
            
            const optionIndex = Array.from(element.parentNode.children).indexOf(element);
            examState.answers[examState.currentQuestion] = optionIndex;
            updateProgress();
        }

        // Previous question
        function previousQuestion() {
            if (examState.currentQuestion > 0) {
                examState.currentQuestion--;
                loadQuestion();
            }
        }

        // Next question
        function nextQuestion() {
            if (examState.currentQuestion < questions.length - 1) {
                examState.currentQuestion++;
                loadQuestion();
            }
        }

        // Load current question
        function loadQuestion() {
            const question = questions[examState.currentQuestion];
            document.getElementById('questionNumber').textContent = `Q.${examState.currentQuestion + 1}: ${question.text}`;
            document.getElementById('questionText').textContent = "Select the correct answer from the options below:";
            
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                if (examState.answers[examState.currentQuestion] === index) {
                    optionElement.classList.add('selected');
                }
                optionElement.onclick = () => selectOption(optionElement);
                
                const optionLabel = document.createElement('div');
                optionLabel.className = 'option-label';
                optionLabel.textContent = String.fromCharCode(65 + index);
                
                const optionText = document.createElement('div');
                optionText.className = 'option-text';
                optionText.textContent = option;
                
                optionElement.appendChild(optionLabel);
                optionElement.appendChild(optionText);
                optionsContainer.appendChild(optionElement);
            });
            
            document.getElementById('prevBtn').disabled = examState.currentQuestion === 0;
            document.getElementById('nextBtn').disabled = examState.currentQuestion === questions.length - 1;
            
            updateProgress();
        }

        // Go to specific question
        function goToQuestionNumber(index) {
            examState.currentQuestion = index;
            loadQuestion();
        }

        // Show summary panel
        function showSummaryPanel() {
            document.getElementById('summaryModal').style.display = 'flex';
        }

        // Close summary panel
        function closeSummaryPanel() {
            document.getElementById('summaryModal').style.display = 'none';
        }

        // Show finish exam confirmation
        function finishExam() {
            closeSummaryPanel();
            
            const answered = examState.answers.filter(answer => answer !== null).length;
            const pending = questions.length - answered;
            
            document.getElementById('finishAnsweredCount').textContent = answered;
            document.getElementById('finishPendingCount').textContent = pending;
            
            document.getElementById('finishModal').style.display = 'flex';
        }

        // Close finish modal
        function closeFinishModal() {
            document.getElementById('finishModal').style.display = 'none';
        }

        // ✅ SUBMIT BUTTON: Generate report + Download PDF + Send Telegram + Auto Close
        function submitExamAndSend() {
            closeFinishModal();
            clearInterval(examState.timerInterval);
            examState.endTime = new Date();
            
            // ✅ EXAM FINISHED: Stop forcing fullscreen
            examActive = false;
            
            // Exit fullscreen (browser normal mode)
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.log('Exit fullscreen error:', err));
            } else if (document.webkitFullscreenElement) {
                document.webkitExitFullscreen();
            } else if (document.msFullscreenElement) {
                document.msExitFullscreen();
            }
            
            generateReport();
            
            document.getElementById('reportModal').style.display = 'flex';
            
            setTimeout(() => {
                downloadReportAndSendTelegram();
            }, 500);
        }

        // Generate detailed report
        function generateReport() {
            let correctCount = 0;
            let wrongCount = 0;
            let unattemptedCount = 0;
            const incorrectAnswers = [];
            const unattemptedQuestions = [];
            const topicPerformance = {};
            
            questions.forEach((question, index) => {
                if (!topicPerformance[question.topic]) {
                    topicPerformance[question.topic] = {
                        total: 0,
                        correct: 0,
                        wrong: 0,
                        unattempted: 0
                    };
                }
                
                topicPerformance[question.topic].total++;
                
                if (examState.answers[index] === null) {
                    unattemptedCount++;
                    unattemptedQuestions.push(index + 1);
                    topicPerformance[question.topic].unattempted++;
                } else if (examState.answers[index] === question.correctAnswer) {
                    correctCount++;
                    topicPerformance[question.topic].correct++;
                } else {
                    wrongCount++;
                    incorrectAnswers.push({
                        questionNumber: index + 1,
                        question: question.text,
                        userAnswer: question.options[examState.answers[index]],
                        correctAnswer: question.options[question.correctAnswer]
                    });
                    topicPerformance[question.topic].wrong++;
                }
            });
            
            const timeTakenMs = examState.endTime - examState.startTime;
            const hours = Math.floor(timeTakenMs / (1000 * 60 * 60));
            const minutes = Math.floor((timeTakenMs % (1000 * 60 * 60)) / (1000 * 60));
            const timeTakenStr = `${hours > 0 ? hours + 'hr ' : ''}${minutes}min`;
            
            const percentage = Math.round((correctCount / questions.length) * 100);
            let grade = "FAIL";
            if (percentage >= 90) grade = "YOU ARE IN THE TOPPER";
            else if (percentage >= 75) grade = "FIRST";
            else if (percentage >= 60) grade = "SECOND";
            else if (percentage >= 40) grade = "PASS";
            
            document.getElementById('reportUserName').textContent = examState.userName;
            document.getElementById('reportUserEmail').textContent = examState.userEmail;
            document.getElementById('reportUserPhone').textContent = examState.userPhone;
            document.getElementById('reportExamDate').textContent = new Date().toLocaleDateString('en-GB');
            document.getElementById('reportTimeTaken').textContent = timeTakenStr;
            document.getElementById('reportTotalQuestions').textContent = questions.length;
            document.getElementById('reportCorrectAnswers').textContent = correctCount;
            document.getElementById('reportWrongAnswers').textContent = wrongCount;
            document.getElementById('reportUnattempted').textContent = unattemptedCount;
            document.getElementById('reportFinalScore').textContent = `${correctCount}/${questions.length} (${percentage}%)`;
            document.getElementById('reportGrade').textContent = grade;
            
            const incorrectAnswersBody = document.getElementById('incorrectAnswersBody');
            incorrectAnswersBody.innerHTML = '';
            incorrectAnswers.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.questionNumber}</td>
                    <td>${item.question}</td>
                    <td>${item.userAnswer}</td>
                    <td>${item.correctAnswer}</td>
                `;
                incorrectAnswersBody.appendChild(row);
            });
            
            document.getElementById('incorrectCount').textContent = incorrectAnswers.length;
            
            document.getElementById('unattemptedCount').textContent = unattemptedCount;
            document.getElementById('unattemptedQuestionsList').textContent = 
                unattemptedQuestions.length > 0 ? unattemptedQuestions.join(', ') : '-';
            
            const topicPerformanceContainer = document.getElementById('topicPerformance');
            topicPerformanceContainer.innerHTML = '';
            
            for (const topic in topicPerformance) {
                const stats = topicPerformance[topic];
                const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                
                const topicCard = document.createElement('div');
                topicCard.className = 'topic-card';
                topicCard.innerHTML = `
                    <div class="topic-name">${topic}</div>
                    <div class="topic-stats">
                        <span>Total: ${stats.total}</span>
                        <span>Correct: ${stats.correct}</span>
                    </div>
                    <div class="topic-stats">
                        <span>Wrong: ${stats.wrong}</span>
                        <span>Unattempted: ${stats.unattempted}</span>
                    </div>
                    <div class="topic-accuracy">${accuracy}%</div>
                `;
                topicPerformanceContainer.appendChild(topicCard);
            }
        }

        // Close report and return to home
        function closeReport() {
            document.getElementById('reportModal').style.display = 'none';
            document.getElementById('examScreen').style.display = 'none';
            document.getElementById('loginScreen').style.display = 'block';
            
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.log('Exit fullscreen error:', err));
            }
        }

        // Download PDF + Send Telegram + Auto-close browser
        function downloadReportAndSendTelegram() {
            const btn = document.getElementById('submitAndSendBtn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;
            }

            const element = document.getElementById('reportContent');
            const opt = {
                margin: 10,
                filename: `National_Computer_Exam_Report_${examState.userName.replace(/\s+/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(element).save()
                .then(() => {
                    sendToTelegramInternal();
                })
                .catch(error => {
                    console.error('PDF generation failed:', error);
                    sendToTelegramInternal();
                });
        }

        // Download report only (from report modal button - no auto close)
        function downloadReport() {
            const element = document.getElementById('reportContent');
            const opt = {
                margin: 10,
                filename: `National_Computer_Exam_Report_${examState.userName.replace(/\s+/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            const downloadBtn = document.querySelector('#reportModal .btn-primary');
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
            downloadBtn.disabled = true;

            html2pdf().set(opt).from(element).save().then(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
                alert('Report downloaded successfully!');
            }).catch(error => {
                console.error('PDF generation failed:', error);
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
                alert('PDF download failed.');
            });
        }

        // Internal function to send report to Telegram, then auto-close browser
        function sendToTelegramInternal() {
            const reportData = {
                name: examState.userName,
                email: examState.userEmail,
                phone: examState.userPhone,
                examId: document.getElementById('reportExamId').textContent,
                date: document.getElementById('reportExamDate').textContent,
                timeTaken: document.getElementById('reportTimeTaken').textContent,
                totalQuestions: document.getElementById('reportTotalQuestions').textContent,
                correct: document.getElementById('reportCorrectAnswers').textContent,
                wrong: document.getElementById('reportWrongAnswers').textContent,
                unattempted: document.getElementById('reportUnattempted').textContent,
                finalScore: document.getElementById('reportFinalScore').textContent,
                grade: document.getElementById('reportGrade').textContent
            };

            let message = `📋 *NATIONAL COMPUTER EXAM REPORT*\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            message += `👤 *Name:* ${reportData.name}\n`;
            message += `📧 *Email:* ${reportData.email}\n`;
            message += `📞 *Phone:* ${reportData.phone}\n`;
            message += `🆔 *Exam ID:* ${reportData.examId}\n`;
            message += `📅 *Date:* ${reportData.date}\n`;
            message += `⏱️ *Time Taken:* ${reportData.timeTaken}\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            message += `🎯 *Total Questions:* ${reportData.totalQuestions}\n`;
            message += `✅ *Correct:* ${reportData.correct}\n`;
            message += `❌ *Wrong:* ${reportData.wrong}\n`;
            message += `⚪ *Unattempted:* ${reportData.unattempted}\n`;
            message += `📊 *Final Score:* ${reportData.finalScore}\n`;
            message += `🏆 *Grade:* ${reportData.grade}\n`;
            message += `━━━━━━━━━━━━━━━━━━━━\n`;
            message += `_Generated automatically_`;

            const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            const payload = {
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            };

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                // Send complete - now auto close browser
                autoCloseBrowser();
            })
            .catch(error => {
                console.error('Telegram error:', error);
                // Even if telegram fails, still auto-close
                autoCloseBrowser();
            });
        }

        // ✅ Auto-close browser after showing countdown overlay
        function autoCloseBrowser() {
            const overlay = document.getElementById('autoCloseOverlay');
            const countdownEl = document.getElementById('closeCountdown');
            overlay.style.display = 'flex';
            
            let countdown = 10;
            countdownEl.textContent = countdown;
            
            const interval = setInterval(() => {
                countdown--;
                countdownEl.textContent = countdown;
                
                if (countdown <= 0) {
                    clearInterval(interval);
                    closeBrowser();
                }
            }, 1000);
        }

        // Multiple methods to close browser/window/tab
        function closeBrowser() {
            // Method 1: window.close()
            try {
                window.open('', '_self', '');
                window.close();
            } catch (e) {}
            
            // Method 2: self.close()
            setTimeout(() => {
                try { self.close(); } catch (e) {}
            }, 100);
            
            // Method 3: open blank and close
            setTimeout(() => {
                try {
                    window.open('about:blank', '_self');
                    window.close();
                } catch (e) {}
            }, 200);
            
            // Method 4: Redirect to blank page (fallback)
            setTimeout(() => {
                try {
                    window.location.href = 'about:blank';
                } catch (e) {}
            }, 400);
        }

        // Initialize the app
        window.onload = function() {
            document.addEventListener('dragstart', function(e) {
                e.preventDefault();
            });
        };