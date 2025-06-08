export function downloadHTML(content: string, filename = 'landing.html') {
  const blob = new Blob([content], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
