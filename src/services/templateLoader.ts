import fs from 'fs';
import path from 'path';

export function loadTemplate(
    templateName: string, 
    variables?: Record<string, string>
): string {
    const templatePath = path.resolve(__dirname, '../templates', `${templateName}.html`);
    let content = fs.readFileSync(templatePath, 'utf-8');

    if (variables) {
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            content = content.replace(regex, value);
        }
    }

    return content;
}