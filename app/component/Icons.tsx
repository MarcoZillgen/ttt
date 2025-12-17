export function XIcon() {
  return (
    <div
      className="
            w-full h-full
            bg-x
            [mask-image:url(/x.svg)]
            [mask-size:contain]
            [mask-repeat:no-repeat]
            [mask-position:center]
            animate-scale-in
          "
    />
  );
}

export function OIcon() {
  return (
    <div
      className="
            w-full h-full
            bg-o
            [mask-image:url(/o.svg)]
            [mask-size:contain]
            [mask-repeat:no-repeat]
            [mask-position:center]
            animate-scale-in
          "
    />
  );
}
