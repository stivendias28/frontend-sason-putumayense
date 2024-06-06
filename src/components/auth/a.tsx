import Link from "next/link"

interface Promps extends React.ComponentPropsWithoutRef<"a"> {}

export function A({children, ...promps}: Promps) {
    return (
        <a
            {...promps}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
            {children}
        </a>
    )
}
