export const combine = (
  ...styles: (string | [boolean | undefined, ...string[]] | string[])[]
) =>
  styles
    .filter((style) => !!style[0])
    .map((style) =>
      // eslint-disable-next-line no-nested-ternary
      typeof style === "string"
        ? [style]
        : typeof style[0] === "string"
          ? style.slice(1)
          : style,
    )
    .flat()
    .join(" ");
