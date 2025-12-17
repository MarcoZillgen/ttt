export function XIcon({activated}: { activated: boolean }) {
  return (
    <div
      className={`
            w-full h-full
            [mask-image:url(/x.svg)]
            [mask-size:contain]
            [mask-repeat:no-repeat]
            [mask-position:center]
            animate-scale-in
            transition
            duration-100
            ${activated ? 'bg-x' : 'bg-stone-600' }
          `}
    />
  );
}

export function OIcon({activated}: { activated: boolean }) {
  return (
    <div
      className={`
            w-full h-full
            [mask-image:url(/o.svg)]
            [mask-size:contain]
            [mask-repeat:no-repeat]
            [mask-position:center]
            animate-scale-in
            transition
            duration-100
            ${activated ? 'bg-o' : 'bg-stone-600' }
          `}
    />
  );
}
