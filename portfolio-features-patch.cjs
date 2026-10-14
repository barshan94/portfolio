const fs = require("node:fs");
const file = "src/pages/index.astro";
let s = fs.readFileSync(file, "utf8");

const start = s.indexOf('            <div class="feature-list">');
const end = s.indexOf('            <div class="tag-list" aria-label="Technologies">', start);

if (start < 0 || end < 0) {
  console.error("Feature list boundaries not found. No changes made.");
  process.exit(1);
}

const features = `            <div class="feature-list">
              <div class="feature-item">
                <span class="feature-number">01</span>
                <div>
                  <h4>Transactions &amp; financial ledger</h4>
                  <p>Organize income, expenses, donations, transfers, and connected account balances.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-number">02</span>
                <div>
                  <h4>Budgets &amp; savings goals</h4>
                  <p>Set spending limits, monitor budget usage, and track progress toward financial targets.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-number">03</span>
                <div>
                  <h4>Financial assistant</h4>
                  <p>Explore natural-language questions about finances, such as net worth, loans, and budgets.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-number">04</span>
                <div>
                  <h4>Recurring transactions</h4>
                  <p>Organize regular income and expenses to make recurring financial commitments easier to track.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-number">05</span>
                <div>
                  <h4>Loans &amp; tuition tracking</h4>
                  <p>Manage lending, borrowing, repayments, student payment history, and outstanding dues.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-number">06</span>
                <div>
                  <h4>Deposits, FDRs &amp; investments</h4>
                  <p>Organize deposit records, fixed-deposit details, and long-term investment activity.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-number">07</span>
                <div>
                  <h4>Audit log &amp; reversible changes</h4>
                  <p>Improve accountability with traceable financial changes and controlled reversals.</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-number">08</span>
                <div>
                  <h4>Financial reports &amp; exports</h4>
                  <p>Review financial activity and export reports in Excel, CSV, and PDF formats.</p>
                </div>
              </div>
            </div>

`;

s = s.slice(0, start) + features + s.slice(end);
fs.writeFileSync(file, s, "utf8");
console.log("Updated Money Calculator feature list with 8 grouped capabilities.");
