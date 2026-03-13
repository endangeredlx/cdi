#!/bin/bash
# CDI Asana Project Board Sync Script
# Usage: ./sync-asana.sh
#
# Prerequisites:
#   1. Generate a Personal Access Token at https://app.asana.com/0/my-apps
#   2. Set: export ASANA_TOKEN="your_token_here"
#
# This script fetches tasks from the CDI Asana project and regenerates pb/index.html

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ID="1213060510407649"
OUTPUT_FILE="$WEBSITE_DIR/pb/index.html"

# Check for token
if [ -z "$ASANA_TOKEN" ]; then
    echo "❌ ASANA_TOKEN not set"
    echo ""
    echo "To set up:"
    echo "  1. Go to https://app.asana.com/0/my-apps"
    echo "  2. Click 'Create new token'"
    echo "  3. Name it 'CDI Sync' and copy the token"
    echo "  4. Run: export ASANA_TOKEN='your_token_here'"
    echo "  5. Re-run this script"
    exit 1
fi

echo "🔄 Fetching tasks from Asana..."

# Fetch all tasks with sections
TASKS=$(curl -s "https://app.asana.com/api/1.0/projects/$PROJECT_ID/tasks?opt_fields=name,notes,completed,memberships.section.name,permalink_url" \
    -H "Authorization: Bearer $ASANA_TOKEN")

# Check for errors
if echo "$TASKS" | grep -q '"errors"'; then
    echo "❌ Asana API error:"
    echo "$TASKS" | jq '.errors'
    exit 1
fi

# Parse into sections
echo "📊 Processing tasks..."

COMPLETED=$(echo "$TASKS" | jq '[.data[] | select(.memberships[0].section.name == "Completed" or .completed == true)]')
IN_PROGRESS=$(echo "$TASKS" | jq '[.data[] | select(.memberships[0].section.name == "In Progress" and .completed == false)]')
UPCOMING=$(echo "$TASKS" | jq '[.data[] | select(.memberships[0].section.name == "Upcoming" and .completed == false)]')

COMPLETED_COUNT=$(echo "$COMPLETED" | jq 'length')
IN_PROGRESS_COUNT=$(echo "$IN_PROGRESS" | jq 'length')
UPCOMING_COUNT=$(echo "$UPCOMING" | jq 'length')
TOTAL=$((COMPLETED_COUNT + IN_PROGRESS_COUNT + UPCOMING_COUNT))
PROGRESS=$((COMPLETED_COUNT * 100 / TOTAL))

echo "  ✅ Completed: $COMPLETED_COUNT"
echo "  🔄 In Progress: $IN_PROGRESS_COUNT"
echo "  📅 Upcoming: $UPCOMING_COUNT"
echo "  📈 Progress: $PROGRESS%"

# Generate task cards function
generate_cards() {
    local tasks="$1"
    local status="$2"
    
    echo "$tasks" | jq -r '.[] | @base64' | while read -r task; do
        _jq() {
            echo "$task" | base64 --decode | jq -r "$1"
        }
        
        name=$(_jq '.name')
        notes=$(_jq '.notes // ""' | head -c 200 | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g')
        url=$(_jq '.permalink_url')
        
        # Escape name for HTML
        name_escaped=$(echo "$name" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g')
        
        echo "            <div class=\"task-card $status\" onclick=\"window.open('$url', '_blank')\" style=\"cursor: pointer;\">"
        echo "                <div class=\"task-name\">$name_escaped</div>"
        if [ -n "$notes" ] && [ "$notes" != "null" ] && [ "$notes" != "" ]; then
            echo "                <div class=\"task-notes\">$notes</div>"
        fi
        echo "                <a href=\"$url\" class=\"task-link\" onclick=\"event.stopPropagation()\">View in Asana &gt;</a>"
        echo "            </div>"
    done
}

SYNC_DATE=$(date "+%B %d, %Y")

echo "📝 Generating HTML..."

# Generate new HTML (keeping exact same styling)
cat > "$OUTPUT_FILE" << 'HTMLHEADER'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDI Project Board | Crew Development Institute</title>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --cdi-gold: #D4AF37;
            --cdi-dark: #0A0A0A;
            --completed-green: #5BAD7A;
            --progress-gold: #D4AF37;
            --upcoming-blue: #6BA3D6;
            --text-primary: #E8E8E8;
            --text-secondary: #888;
            --text-muted: #666;
            --border-dark: #1A1A1A;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background-color: var(--cdi-dark); color: var(--text-primary); font-family: 'Source Sans Pro', sans-serif; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%); padding: 40px 20px; border-bottom: 3px solid var(--cdi-gold); display: flex; justify-content: space-between; align-items: flex-start; }
        .header-left { flex: 1; }
        .header-title { font-family: 'Oswald', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; line-height: 1.2; }
        .header-divider { width: 40px; height: 3px; background-color: var(--cdi-gold); margin: 15px 0; }
        .header-subtitle, .header-tagline { font-size: 14px; color: var(--text-secondary); margin-bottom: 5px; }
        .header-stats { text-align: right; min-width: 200px; }
        .stat-box { display: inline-block; margin-left: 30px; }
        .stat-number { font-size: 32px; font-weight: 700; color: var(--cdi-gold); display: block; }
        .stat-label { font-size: 12px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; }
        .board { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; }
        .column { border-right: 1px solid var(--border-dark); padding: 20px; min-height: 600px; }
        .column:last-child { border-right: none; }
        .column-header { display: flex; align-items: center; margin-bottom: 20px; font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .column-dot { width: 10px; height: 10px; border-radius: 50%; margin-right: 10px; }
        .completed .column-dot { background-color: var(--completed-green); }
        .in-progress .column-dot { background-color: var(--progress-gold); }
        .upcoming .column-dot { background-color: var(--upcoming-blue); }
        .task-card { border-left: 3px solid; padding: 15px; margin-bottom: 15px; background-color: #0F0F0F; border-radius: 2px; cursor: pointer; transition: all 0.2s ease; }
        .task-card:hover { background-color: #1A1A1A; transform: translateX(5px); }
        .task-card.completed { border-left-color: var(--completed-green); }
        .task-card.in-progress { border-left-color: var(--progress-gold); }
        .task-card.upcoming { border-left-color: var(--upcoming-blue); }
        .task-name { font-weight: 600; margin-bottom: 8px; font-size: 14px; line-height: 1.4; }
        .task-notes { font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4; }
        .task-notes a { color: var(--cdi-gold); text-decoration: none; }
        .task-notes a:hover { color: #FFD700; }
        .task-link { font-size: 11px; color: var(--cdi-gold); text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px; }
        .task-link:hover { color: #FFD700; }
        .footer { background-color: #0F0F0F; padding: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary); border-top: 1px solid var(--border-dark); }
        .footer a { color: var(--cdi-gold); text-decoration: none; }
        .footer a:hover { color: #FFD700; }
        @media (max-width: 900px) { .board { grid-template-columns: 1fr; } .column { border-right: none; border-bottom: 1px solid var(--border-dark); } }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-left">
            <div class="header-title">Crew Development<br>Institute</div>
            <div class="header-divider"></div>
            <div class="header-subtitle">Project Management Board</div>
            <div class="header-tagline">Ghana Partnership • 2026 Roadmap</div>
        </div>
        <div class="header-stats">
HTMLHEADER

# Add dynamic stats
cat >> "$OUTPUT_FILE" << EOF
            <div class="stat-box">
                <span class="stat-number">$COMPLETED_COUNT</span>
                <span class="stat-label">Completed</span>
            </div>
            <div class="stat-box">
                <span class="stat-number">$PROGRESS%</span>
                <span class="stat-label">Progress</span>
            </div>
        </div>
    </div>
    <div class="board">
        <div class="column completed">
            <div class="column-header">
                <div class="column-dot"></div>
                COMPLETED • $COMPLETED_COUNT tasks
            </div>
EOF

# Add completed tasks
generate_cards "$COMPLETED" "completed" >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << EOF
        </div>
        <div class="column in-progress">
            <div class="column-header">
                <div class="column-dot"></div>
                IN PROGRESS • $IN_PROGRESS_COUNT tasks
            </div>
EOF

# Add in-progress tasks
generate_cards "$IN_PROGRESS" "in-progress" >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << EOF
        </div>
        <div class="column upcoming">
            <div class="column-header">
                <div class="column-dot"></div>
                UPCOMING • $UPCOMING_COUNT tasks
            </div>
EOF

# Add upcoming tasks
generate_cards "$UPCOMING" "upcoming" >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << EOF
        </div>
    </div>
    <div class="footer">
        <div class="footer-left">
            <div>CDI • Building Crews Who Build Shows</div>
            <div><a href="https://app.asana.com/0/$PROJECT_ID" target="_blank">View in Asana</a></div>
            <div>Last synced: $SYNC_DATE</div>
        </div>
        <div class="footer-right">
            Target Launch: Q4 2026 • Accra, Ghana
        </div>
    </div>
</body>
</html>
EOF

echo "✅ Generated: $OUTPUT_FILE"
echo ""
echo "To deploy:"
echo "  cd $WEBSITE_DIR"
echo "  git add pb/index.html"
echo "  git commit -m 'Sync project board from Asana'"
echo "  git push"
