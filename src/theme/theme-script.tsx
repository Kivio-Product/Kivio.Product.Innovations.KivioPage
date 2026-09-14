export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('kivio-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t}catch(e){document.documentElement.classList.add('dark')}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
