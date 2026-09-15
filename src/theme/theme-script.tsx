export function ThemeScript() {
  // Dark-first brand: dark is the default for first-time visitors regardless of OS preference.
  const code = `(function(){try{var t=localStorage.getItem('kivio-theme');if(t!=='light'&&t!=='dark'){t='dark'}document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t}catch(e){document.documentElement.classList.add('dark')}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
