import React from "react";

const Logo = props => {
  return (
    <svg viewBox="0 0 500 500" width="1em" height="1em" {...props}>
      <defs>
        <linearGradient
          x1="50%"
          y1="25.963%"
          x2="50%"
          y2="100%"
          id="logo_svg__a"
        >
          <stop stopColor="#FEFEFE" offset="0%" />
          <stop stopColor="#D2D4D5" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="logo_svg__b">
          <stop stopColor="#D4D5D6" offset="0%" />
          <stop stopColor="#FAFBFB" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="71.7%"
          y1="37.738%"
          x2="0%"
          y2="100%"
          id="logo_svg__c"
        >
          <stop stopColor="#FEFEFE" offset="0%" />
          <stop stopColor="#D2D4D5" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="112.505%"
          y1="100%"
          x2="25.798%"
          y2="100%"
          id="logo_svg__d"
        >
          <stop stopColor="#FDFDFD" offset="0%" />
          <stop stopColor="#D5D7D8" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="#38817a" d="M0 0h500v500H0z" />
        <path
          fill="url(#logo_svg__a)"
          d="M158.821 19.769H40.206v19.769H178.59v158.154l19.769-19.769V19.769z"
          transform="translate(150 99)"
        />
        <path
          fill="url(#logo_svg__b)"
          d="M158.821 39.538v138.385H.667l19.769 19.769H178.59V39.538z"
          transform="translate(150 99)"
        />
        <path
          fill="url(#logo_svg__c)"
          d="M20.436 0L.667 19.769v158.154h158.154v-19.769H20.436z"
          transform="translate(150 99)"
        />
        <path
          fill="url(#logo_svg__d)"
          d="M20.436 0v158.154h19.77V19.769h158.153L178.59 0z"
          transform="translate(150 99)"
        />
        <path fill="#C8C8C8" d="M308.821 146.226h19.769v-7.688h-19.769z" />
        <g>
          <text
            fontFamily="Heebo"
            fontSize={40}
            fontWeight={500}
            letterSpacing={8}
            fill="#FFF"
            fillOpacity={0.5}
            data-text-alignment="C"
            transform="translate(40 394)"
          />
          <path d="M40 394h420v40H40z" />
        </g>
        <g>
          <path d="M40 320h420v60H40z" />
          <text
            fontFamily="Heebo"
            fontSize={50}
            fontWeight={700}
            letterSpacing={5}
            fill="#FFF"
            data-text-alignment="C"
            transform="translate(40 320)"
          >
            <tspan x={50} y={45.5}>
              {"Simple Tasks"}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
}

export default Logo