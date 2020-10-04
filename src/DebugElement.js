const debugActiveElementID = createID()

// TODO
function DebugActiveElement({ activeElement }) {
	return (
		<>
			{/**/}

			<StyleOnce id={debugActiveElementID}>
				{css`
					.absolute__${debugActiveElementID} {
						padding-top: ${px(8)};
						padding-right: ${px(8)};
						padding-bottom: ${px(8)};
						padding-left: ${px(8)};
						position: absolute;
						top: ${activeElement.style.height < 32 ? "100%" : "auto"};
						right: 0;
						bottom: ${activeElement.style.height < 32 ? "auto" : "0"};
						user-select: none;
					}
					.debugActiveElement__${debugActiveElementID} {
						white-space: pre;
						font-family: monospace;
					}
				`}
			</StyleOnce>

			<div className={`absolute__${debugActiveElementID}`}>
				<div className={`debugActiveElement__${debugActiveElementID}`}>{activeElement.style.height}px</div>
			</div>

			{/**/}
		</>
	)
}
