import * as React from 'react'

type Props = {
  children: React.ReactNode | React.ReactNode[]
  css: string[]
  scripts: string[]
  state: string
  meta: {
    title?: string
    description?: string
  }
};

const HTML = (props: Props) => {
  const {
    children,
    css = [],
    scripts = [],
    state = '{}',
    meta,
  } = props

  return (
    <html lang="">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content={meta.description}
        />
        <title>
          {meta.title}
        </title>
        {css.filter(Boolean).map((href) => (
          <link
            key={href}
            rel="stylesheet"
            href={href}
          />
        ))}
        __CRITICAL_CSS__
        <script dangerouslySetInnerHTML={{ __html: state ? `window.__PRELOADED_STATE__ = ${state}` : '' }} />
      </head>
      <body>
        <div
          id="root"
          className="root"
        >
          {children}
        </div>
        {scripts.filter(Boolean).map((src) => (
          <script
            key={src}
            src={src}
          />
        ))}
      </body>
    </html>
  )
}

export default HTML
