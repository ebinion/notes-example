/** Used to display colors in docs */
export const Color = (props: {
  /** Value used to declare color in CSS, e.g. var(--c-black) */
  defintion: string
}) => (
  <figure>
    <div
      style={{
        backgroundColor: props.defintion,
        border: '1px solid var(--c-tertiary)',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        margin: '0 auto',
      }}
    />
    <figcaption
      className="text--s"
      style={{ marginTop: '16px', textAlign: 'center' }}
    >
      <code
        style={{
          fontFamily: 'monospace',
        }}
      >
        {props.defintion}
      </code>
    </figcaption>
  </figure>
)

export const colorList = [
  'var(--c-blue)',
  'var(--c-blue-secondary)',
  'var(--c-green)',
  'var(--c-red)',
  'var(--c-red-secondary)',
  'var(--c-red-tertiary)',
  'var(--c-bg)',
  'var(--c-bg-secondary)',
  'var(--c-on-color)',
  'var(--c-on-color-secondary)',
  'var(--c-primary)',
  'var(--c-secondary)',
  'var(--c-tertiary)',
  'var(--c-quatenary)',
]

/** Displays a list of colors */
export const Colors = (props: { colorList: string[] }) => (
  <ul
    style={{
      justifyContent: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      margin: '0',
      padding: '0',
      gap: '24px',
    }}
  >
    {colorList.map((colorDef) => (
      <li style={{ width: '200px', padding: '0', margin: '0' }}>
        <Color defintion={colorDef} />
      </li>
    ))}
  </ul>
)
