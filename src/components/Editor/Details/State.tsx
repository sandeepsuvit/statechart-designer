import { Checkbox, Input } from 'antd'
import * as React from 'react'

interface IProps {
	model: any
	onChange(change: object): void
	updateGraph(key: string, value: any): void
}

export default class StateDetails extends React.Component<IProps> {
	onChange = (key: string, value: any) => {
		const change = {
			tempModel: {
				...this.props.model,
				[key]: value,
			},
		}
		this.props.onChange(change)
		this.props.updateGraph(key, value)
	}
	onBlur = () => {
		this.props.onChange({ tempModel: null })
	}
	render() {
		return (
			<React.Fragment>
				<div className="p">
					Label：
					<Input
						size="small"
						className="input name-input"
						value={this.props.model.label}
						onChange={(e) => this.onChange('label', e.target.value)}
						onBlur={(e) => this.onBlur()}
					/>
				</div>
				<div className="p">
					<Checkbox
						checked={this.props.model.initial}
						onChange={(e) => {
							this.onChange('initial', !this.props.model.initial)
						}}>
						Initial
					</Checkbox>
				</div>
				{/* <div className="p">
					On Entry:
					<Input
						size="small"
						className="input name-input"
						value={this.props.model.entryAction}
						onChange={(e) => this.onChange('entryAction', e.target.value)}
						onBlur={(e) => this.onBlur('entryAction', e.target.value)}
					/>
				</div> */}
			</React.Fragment>
		)
	}
}
