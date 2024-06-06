interface Promps extends React.LabelHTMLAttributes<HTMLLabelElement>{}

export function Label({children, ...promps}: Promps) {
    return (
        <label 
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
            {...promps}
        >
            {children}
        </label>
    )
}
