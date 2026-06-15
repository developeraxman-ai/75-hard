import './globals.css';

export const metadata = {
  title: '75 Command',
  description: 'Contract before mood.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: '75 Command', statusBarStyle: 'black-translucent' },
};

export const viewport = { themeColor: '#07080a', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-dvh bg-[radial-gradient(circle_at_top,#1b1c22,transparent_40%),#07080a]">
          {children}
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker'in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}))}`,
          }}
        />
      </body>
    </html>
  );
}
