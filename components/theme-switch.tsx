import { useSwitch, VisuallyHidden, SwitchProps } from '@heroui/react'
import { useTheme } from 'next-themes'
import MaterialSymbol from '@/components/material-symbol'

export function ThemeSwitch() {
	const { theme, setTheme } = useTheme()

	return (
		<MaterialSymbol
			className="text-foreground-700"
			icon={theme === 'dark' ? 'light_mode' : 'dark_mode'}
			size={24}
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		/>
	)
}

export function ThemeSwitch2(props: SwitchProps) {
	const { theme, setTheme } = useTheme()
	const {
		Component,
		slots,
		isSelected,
		getBaseProps,
		getInputProps,
		getWrapperProps,
	} = useSwitch(props)

	return (
		<div className="flex flex-col gap-2">
			<Component
				{...getBaseProps()}
				onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			>
				<VisuallyHidden>
					{/* @ts-ignore */}
					<input {...getInputProps()} />
				</VisuallyHidden>
				<div
					{...getWrapperProps()}
					className={slots.wrapper({
						class: [
							'h-8 w-8',
							'flex items-center justify-center',
							'rounded-lg bg-default-100 hover:bg-default-200',
						],
					})}
				>
					{isSelected ? (
						<MaterialSymbol icon="light_mode" />
					) : (
						<MaterialSymbol icon="dark_mode" />
					)}
				</div>
			</Component>
		</div>
	)
}
