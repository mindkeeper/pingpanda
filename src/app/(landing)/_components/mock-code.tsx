import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
export default function MockCode() {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "zoe.martinez2001@email.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`;
  return (
    <div className='relative min-h-[30rem] w-full grow'>
      <div className='absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl'>
        <div className='flex bg-gray-800/40 ring-1 ring-white/5'>
          <div className='-mb-px flex text-sm/6 font-medium text-gray-400'>
            <div className='border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white'>
              ping-panda.js
            </div>
          </div>
        </div>
        <div className='overflow-hidden'>
          <div className='max-h-[30rem]'>
            <SyntaxHighlighter
              language='typescript'
              style={{
                ...oneDark,
                'pre[class*="language-"]': {
                  ...oneDark['pre[class*="language-"]'],
                  background: 'transparent',
                  overflow: 'hidden',
                },
                'code[class*="language-"]': {
                  ...oneDark['code[class*="language-"]'],
                  background: 'transparent',
                },
              }}
            >
              {codeSnippet}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
