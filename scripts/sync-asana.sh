#!/bin/bash
# CDI Asana Project Board Sync Script
# Usage: ./sync-asana.sh
#
# Prerequisites:
#   export ASANA_TOKEN="your_token_here"

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ID="1213060510407649"
OUTPUT_FILE="$WEBSITE_DIR/pb/index.html"

# Section mappings (customize as needed)
# "Completed" section = completed tasks shown
# Active sections = In Progress
# Future sections = Upcoming
COMPLETED_SECTION="1213060510407650"
IN_PROGRESS_SECTIONS="1213060510407652|1213060510407653|1213258988346181|1213303633422773|1213303633422776"
UPCOMING_SECTIONS="1213258988346184"

if [ -z "$ASANA_TOKEN" ]; then
    echo "❌ ASANA_TOKEN not set"
    echo "Run: export ASANA_TOKEN='your_token'"
    exit 1
fi

echo "🔄 Fetching tasks from Asana..."

# Fetch all tasks (handling pagination)
ALL_TASKS="[]"
OFFSET=""
while true; do
    URL="https://app.asana.com/api/1.0/projects/$PROJECT_ID/tasks?opt_fields=name,notes,completed,memberships.section.gid,memberships.section.name,permalink_url&limit=100"
    if [ -n "$OFFSET" ]; then
        URL="$URL&offset=$OFFSET"
    fi
    
    RESPONSE=$(curl -s "$URL" -H "Authorization: Bearer $ASANA_TOKEN")
    
    if echo "$RESPONSE" | grep -q '"errors"'; then
        echo "❌ API error:"
        echo "$RESPONSE" | jq '.errors'
        exit 1
    fi
    
    PAGE_TASKS=$(echo "$RESPONSE" | jq '.data')
    ALL_TASKS=$(echo "$ALL_TASKS $PAGE_TASKS" | jq -s 'add')
    
    OFFSET=$(echo "$RESPONSE" | jq -r '.next_page.offset // empty')
    if [ -z "$OFFSET" ]; then
        break
    fi
done

echo "📊 Processing $(echo "$ALL_TASKS" | jq 'length') tasks..."

# Categorize tasks:
# COMPLETED: tasks marked completed=true
# IN PROGRESS: incomplete tasks in active sections (not in Completed section, not in Program Launch)
# UPCOMING: incomplete tasks in Program Launch section

COMPLETED=$(echo "$ALL_TASKS" | jq '[.[] | select(.completed == true)]')
IN_PROGRESS=$(echo "$ALL_TASKS" | jq --arg sections "$IN_PROGRESS_SECTIONS" '[.[] | select(.completed == false and (.memberships[0].section.gid | test($sections)))]')
UPCOMING=$(echo "$ALL_TASKS" | jq --arg sections "$UPCOMING_SECTIONS" '[.[] | select(.completed == false and (.memberships[0].section.gid | test($sections)))]')

# Also add incomplete tasks from Completed section to In Progress (they're active work)
ACTIVE_IN_COMPLETED=$(echo "$ALL_TASKS" | jq --arg sec "$COMPLETED_SECTION" '[.[] | select(.completed == false and .memberships[0].section.gid == $sec)]')
IN_PROGRESS=$(echo "$IN_PROGRESS $ACTIVE_IN_COMPLETED" | jq -s 'add | unique_by(.gid)')

COMPLETED_COUNT=$(echo "$COMPLETED" | jq 'length')
IN_PROGRESS_COUNT=$(echo "$IN_PROGRESS" | jq 'length')
UPCOMING_COUNT=$(echo "$UPCOMING" | jq 'length')
TOTAL=$((COMPLETED_COUNT + IN_PROGRESS_COUNT + UPCOMING_COUNT))
if [ $TOTAL -gt 0 ]; then
    PROGRESS=$((COMPLETED_COUNT * 100 / TOTAL))
else
    PROGRESS=0
fi

echo "  ✅ Completed: $COMPLETED_COUNT"
echo "  🔄 In Progress: $IN_PROGRESS_COUNT"
echo "  📅 Upcoming: $UPCOMING_COUNT"
echo "  📈 Progress: $PROGRESS%"

SYNC_DATE=$(date "+%B %-d, %Y")

echo "📝 Generating HTML..."

# Generate the HTML
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
        .task-link { font-size: 11px; color: var(--cdi-gold); text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px; }
        .footer { background-color: #0F0F0F; padding: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-secondary); border-top: 1px solid var(--border-dark); }
        .footer a { color: var(--cdi-gold); text-decoration: none; }
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

# Stats section
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

# Generate task cards
generate_cards() {
    local tasks="$1"
    local status="$2"
    
    echo "$tasks" | jq -r '.[] | @base64' | while read -r task; do
        name=$(echo "$task" | base64 --decode | jq -r '.name // ""' | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g')
        notes=$(echo "$task" | base64 --decode | jq -r '.notes // ""' | head -c 200 | tr '\n' ' ' | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g')
        url=$(echo "$task" | base64 --decode | jq -r '.permalink_url // ""')
        
        [ -z "$name" ] && continue
        
        echo "            <div class=\"task-card $status\" onclick=\"window.open('$url', '_blank')\" style=\"cursor: pointer;\">"
        echo "                <div class=\"task-name\">$name</div>"
        if [ -n "$notes" ] && [ "$notes" != "null" ]; then
            echo "                <div class=\"task-notes\">$notes</div>"
        fi
        echo "                <a href=\"$url\" class=\"task-link\" onclick=\"event.stopPropagation()\">View in Asana &gt;</a>"
        echo "            </div>"
    done
}

generate_cards "$COMPLETED" "completed" >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << EOF
        </div>
        <div class="column in-progress">
            <div class="column-header">
                <div class="column-dot"></div>
                IN PROGRESS • $IN_PROGRESS_COUNT tasks
            </div>
EOF

generate_cards "$IN_PROGRESS" "in-progress" >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << EOF
        </div>
        <div class="column upcoming">
            <div class="column-header">
                <div class="column-dot"></div>
                UPCOMING • $UPCOMING_COUNT tasks
            </div>
EOF

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

echo "✅ Done! Generated: $OUTPUT_FILE"
echo ""
echo "To deploy: git add pb/index.html && git commit -m 'Sync from Asana' && git push"
