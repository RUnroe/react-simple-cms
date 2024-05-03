interface CompProps {
  tag: keyof JSX.IntrinsicElements;
}

const ComponentWrapper: React.FunctionComponent<CompProps & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  tag: Wrapper = "div",
  children,
  ...rest
}) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default ComponentWrapper;