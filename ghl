#!/usr/bin/env bash
set -euo pipefail

ISSUE_NUM="${2:-}"

echo "📋 Leyendo issue #${ISSUE_NUM}..."
TITLE=$(gh issue view "$ISSUE_NUM" --json title -q '.title')
BODY=$(gh issue view "$ISSUE_NUM" --json body -q '.body')
echo "✅ $TITLE"

HAS_LABEL=$(gh issue view "$ISSUE_NUM" --json labels -q '.labels[].name' | grep -w "jr" || true)
if [[ -z "$HAS_LABEL" ]]; then
  echo "❌ El issue #${ISSUE_NUM} no tiene label 'jr'. Abortando."
  exit 1
fi
echo "✅ Label 'jr' confirmado"

# Crear rama
BRANCH="jr/issue-${ISSUE_NUM}"

git checkout main && git pull origin main
git checkout -b "$BRANCH"
echo "🌿 Rama: $BRANCH"

PROMPT="Implementa el GitHub Issue #${ISSUE_NUM}.

Título: ${TITLE}
Descripción: ${BODY}

Si el issue es ambiguo o no puedes implementarlo, no hagas ningún cambio de código."

echo "🤖 Ejecutando Claude..."
cd angularApp
claude -p "$PROMPT" \
  --allowedTools "Read" "Edit" "Write" "Glob" "Grep" \
  "Bash(ng generate *)"
cd ..

# Paso 5 — ¿Hubo cambios?
git add .
if git diff --cached --quiet; then
  echo "⚠️ Claude no realizó cambios."
  gh issue comment "$ISSUE_NUM" --body "El JR no pudo implementar este issue. Requiere aclaración."
  exit 1
fi
echo "✅ Cambios detectados"

echo "🔨 Ejecutando ng build..."
cd angularApp
npx ng build || { echo "❌ Build falló. Abortando."; exit 1; }
cd ..
echo "✅ Build exitoso"

# ng test
echo "🧪 Ejecutando ng test..."
cd angularApp
npx ng test --watch=false || { echo "❌ Tests fallaron. Abortando."; exit 1; }
cd ..
echo "✅ Tests exitosos"

# Commit + Push + PR
echo "📦 Creando commit..."
git commit -m "feat(jr): issue #${ISSUE_NUM} — ${TITLE}"

echo "🚀 Subiendo rama..."
git push --set-upstream origin "$BRANCH"

echo "🔁 Creando PR..."
gh pr create \
  --base main \
  --head "$BRANCH" \
  --title "feat(jr): #${ISSUE_NUM} — ${TITLE}" \
  --body "Closes #${ISSUE_NUM}"

echo ""
echo "✅ Flujo completo — PR creado para issue #${ISSUE_NUM}"