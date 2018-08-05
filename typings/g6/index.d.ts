declare module '@antv/g6' {
	export type IGraphType = 'node' | 'edge' | 'guide' | 'model'

	export type IAnchorType = 'input' | 'output'
	export type IAnchor = [number, number, { type: IAnchorType }]
	export type IPointType = 'source' | 'target'

	export interface IKeyShape {
		eventPreFix: string
		gid: string
		id: string
		isKeyShape: boolean
	}

	export type IPoint = {
		index: number
		type: IAnchorType
		x: number
		y: number
	}

	export interface IZoom {
		originMatrix: number[]
		updateMatrix: number[]
	}

	interface IControlPoint {
		x: number
		y: number
	}

	interface IBoxStyle {
		fill?: string
		stroke?: string
		strokeWeight?: number
	}

	interface IBoxLabel extends IBoxStyle {
		text: string
	}

	type IBoxShape = 'rect' | 'circle'

	export type ILabel = string & IBoxLabel

	export interface IData {
		nodes: INode[]
		edges?: IEdge[]
		groups?: IGroup[]
		guides?: IGuide[]
	}

	export interface INode {
		id: string
		index: number
		shape: IBoxShape
		type: IGraphType
		label: ILabel
		style: IBoxStyle
		parent?: string
		/* added */
		initial?: boolean
	}

	export interface IEdge {
		id: string
		source: string
		sourceAnchor: number
		target: string
		targetAnchor: number
		controlPoints?: IControlPoint[]
		index: number
		label: ILabel
		color?: string
		size?: number
		shape: 'line'
		parent?: string
		style?: IBoxStyle
	}

	export interface IGroup {
		id: string
		color: string
		size: number | number[] // [10, 10]
		shape: IBoxShape
		index: number
		label?: ILabel
		style?: IBoxStyle
		parallel?: boolean
		parent?: string
		/* added */
		collapsed?: boolean
		initial?: boolean
	}

	export interface IGuide {}

	export type IEventType = IDOMEvent | IOtherEvent | IEditorEvent

	type IDOMEvent =
		| 'click'
		| 'dblclick'
		| 'mouseenter'
		| 'mouseleave'
		| 'mousedown'
		| 'mouseup'
		| 'mousemove'
		| 'dragstart'
		| 'drag'
		| 'dragend'
		| 'dragenter'
		| 'dragleave'
		| 'drop'
		| 'contextMenu'

	type IOtherEvent =
		| 'keydown'
		| 'keyup'
		| 'mousewheel'
		| 'beforechangesize'
		| 'afterchangesize'
		| 'beforeviewportchange'
		| 'afterviewportchange'
		| 'beforechange'
		| 'afterchange'

	type IEditorEvent =
		| 'afteritemselected'
		| 'afterzoom'
		| 'hoveranchor:beforeaddedge'
		| 'dragedge:beforeshowanchor'

	export type IAction = 'add' | 'update' | 'remove' | 'changeData'

	export interface IEvent {
		currentItem: any
		currentShape: IBoxShape
		shape: IBoxShape
		item: any
		domEvent: Event
		x: number
		y: number
		domX: number
		domY: number
		action: IAction
		toShape: IBoxShape
		toItem: any
	}

	export type IModel = INode | IEdge | IGroup | IGuide

	export interface IBBox {
		centerX: number
		centerY: number
		height: number
		width: number
		x: number
		y: number
		minX: numner
		maxX: number
		minY: number
		maxY: number
	}

	export interface IItem {
		getModel(): IModel
		getGraphicGroup(): IGroup
		getKeyShape(): object
		getBBox(): IBBox
		getParent(): IItem
		getChildren(): IItem[]
		getChildrenBBox(): BBox
		getKeyShape(): IKeyShape
	}

	export interface IGroupItem {
		getChildren(): INode[]
		getAllChildren(): INode[]
		getChildrenBBox(): BBox
	}

	export interface INodeItem {
		getGraphicGroup(): IGroup
		getAnchorPoints(t: any): any[]
		getEges(t: any): IEdge[]
		getModel(): IModel
		getInEdges(): IEdge[]
		getOutEdges(): IEdge[]
		getLinkPoints(t: any): any
		layoutUpdate(): void
	}

	export interface IEdgeItem {
		getPoints(): IPoint[]
		getSource(): IItem
		getTarget(): IItem
		layoutUpdate(): void
		linkedItemVisible(): void
		_afterDraw(): void
		_beforeDraw(): void
		_shouldDraw(): void
		_getControlPoints(): IControlPoint[]
	}

	type IGraphLayout = (
		nodes: INode[],
		edges: IEdge[],
	) => void | {
		execute(): void
	}

	type IFitView =
		| 'tl'
		| 'lc'
		| 'bl'
		| 'cc'
		| 'tc'
		| 'rc'
		| 'br'
		| 'bc'
		| 'autoZoom'

	function zoom(scale: number): void
	function zoom(graphPoint: IControlPoint, scale: number): void

	function graphOn(eventType: 'afteritemselected', ev: { item: Item }): void
	function graphOn(eventType: 'afterzoom', ev: IZoom): void
	function graphOn(
		eventType: 'hoveranchor:beforeaddedge',
		ev: { anchor: IPoint; item: IItem; cancel: boolean },
	): void
	function graphOn(
		eventType: 'dragedge:beforeshowanchor',
		ev: {
			cancel: boolean
			dragEndPointType: IPointType
			source: IItem
			sourceAnchor: IPoint
			target: IItem
			targetAnchor: IPoint
		},
	)
	function graphOn(
		eventType: 'beforechange',
		{ action: IAction, item: any, model: any },
	): void
	function graphOn(
		eventType: 'afterchange',
		{ action: IAction, item: any, model: any, updateModel: any },
	): void

	interface IGraph {
		add(type: IGraphType, model: IModel)
		addGroup(t: any): any
		addOutterShape(t: any, e: any, n: any): any
		anchorHasBeenLinked(start: IItem, anchor: IPoint): any
		align(a, b, c): void
		autoZoom(): void
		beginAdd(t: any, e: any): any
		beginEditLabel(t: any): void
		cancelAdd(): void
		changeMode(t: any): void
		clear(): void
		clearActived(): void
		clearAlignLine(): void
		clearItemActived(t: any): void
		clearItemSelected(t: any): void
		clearOutterShape(t: any): void
		clearSelected(): void
		css(t: any): void
		delete(): void
		dragEdgeBeforeShowAnchor(t: any, e: any, n: any): any
		drawControlPoint(t: any): any
		endAdd(): void
		endEditLabel(): void
		find(id: string): INode | undefined
		focus(item: string | IModel)
		focusPoint(graphPoint: IPoint): IPoint
		focusPointByDom(t: any): any
		forceDraw(): void
		getActived(): void
		getDomPoint(graphPoint: IControlPoint): IControlPoint
		getEdges(): IEdge[]
		getGraph(): any
		getGridCell(): any
		getGroups(): IGroup[]
		// getGuides(): IGuide[]
		getItems(): any[]
		getMatrix(): any
		getMaxZoom(): number
		getMinZoom(): number
		getMode(): any
		getNodes(): INode[]
		getPoint(t: any): any
		getSelected(): any
		getZoom(): number
		hideGrid(): any
		hoverShowAnchor(t: any): any
		newGroup(t: any): any
		on: graphOn
		read(data: IData): any
		remove(item: IItem)
		render(): any
		resetZoom(): void
		save(): IData
		setActived(t, e): any
		setHotspotActived(t: any, e: any): any
		setItemSelected(t: any): any
		setLabelEditorBeginPosition(t: any): any
		setSelected(t, e): any
		showAnchor(t: any, e: any, n: any): any
		showGrid(t: any): any
		toBack(): void
		toFront(): void
		translate(t: number, t: number): void
		update(item: string | IItem, model: IModel)
		updateMatrix(t: any): any
		updateStatus(): any
		unGroup(): any
		zoom(t: any, e: any): any
		zoomByDom(t: any, e: any): any
	}

	interface IGraphConfig {
		container: Element | string
		width: number
		height: number
		fitView: IFitView
		fitViewPadding: number | number[]
		animate: boolean
		minZoom: number
		maxZoom: number
		mode: string
		plugins: Array
		layout:
			| {
					auto: boolean
					processer: IGraphLayout
			  }
			| IGraphLayout
	}
	export default class G6 {
		Graph(graphConfig: IGraphConfig): IGraph
	}
}