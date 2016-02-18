var diagramSize = 60;

function showPoliticians( politicians ) {
  var container = document.getElementById( 'politicians' ),
      circleData, circleData2,
      instruction, politician,
      politicianElement,
      maxSector,
      uniqueSectors,
      sectorsForPolitician, smartCanvas, smartCanvas2,
      lastPosition;

  while( politicians.length ) {
    politician = politicians.shift();
    instruction = {
      h1: politician.name,
      ul: {
        template: '#job',
        list: politician.entanglements,
        convert: convertEntanglement
      }
    };
    politicianElement = instantiateTemplate( '#politician', instruction );

    sectorsForPolitician = {};

    maxSector = 0;
    currentPosition = 0;

    politician.entanglements.forEach( addJob );

    circleData = [];
    circleData2 = [];

    uniqueSectors = Object.keys( sectorsForPolitician ).length;
    Object.keys( sectorsForPolitician ).sort().forEach( addToDataCircle );

    smartCanvas = new SmartCanvas(
      { size: { x: diagramSize, y: diagramSize } },
      politicianElement.querySelector( '.canvas-container' )
    );

    smartCanvas2 = new SmartCanvas(
      { size: { x: diagramSize, y: diagramSize } },
      politicianElement.querySelector( '.canvas-container2' )
    );

    // smartCanvas.context.shadowBlur = smartCanvas2.context.shadowBlur = 5 * devicePixelRatio;
    // smartCanvas.context.shadowColor = smartCanvas2.context.shadowColor = 'black';
    smartCanvas.camera.rotation = -Math.PI / 2;
    smartCanvas2.camera.rotation = -Math.PI / 2;
    smartCanvas.add( new DataCircle( circleData ) );
    smartCanvas2.add( new DataCircle( circleData2 ) );

    smartCanvas.canvas.addEventListener( 'mouseout', hideTooltip );
    smartCanvas2.canvas.addEventListener( 'mouseout', hideTooltip );

    container.appendChild( politicianElement );
  }

  function convertEntanglement( entanglement ) {
    return {
      li: {
        textContent: entanglement.description,
        'data-sector': entanglement.sector,
        style: 'background-color=' + colors[ entanglement.sector ]
      }
    };
  }

  function addJob( job ) {
    sectorsForPolitician[ job.sector ] = sectorsForPolitician[ job.sector ] || 0;
    ++sectorsForPolitician[ job.sector ];
    maxSector = Math.max( maxSector, sectorsForPolitician[ job.sector ] );
  }

  function addToDataCircle( key, i ) {
    var value = sectorsForPolitician[ key ],
        angle = 1 / politician.entanglements.length * value;
    
    circleData.push( {
      start: 1 / uniqueSectors * i,
      end: 1 / uniqueSectors * i + 1 / uniqueSectors,
      radius: 25 * ( value / maxSector ) / 2,
      width: 25 * ( value / maxSector ),
      color: colors[ key ],
      name: key,
      over: showOrUpdateTooltip
    } );

    circleData2.push( {
      start: currentPosition,
      end: currentPosition + angle,
      radius: 12.5,
      width: 25,
      color: colors[ key ],
      name: key,
      over: showOrUpdateTooltip
    } );

    currentPosition += angle;
  }
}

function showOrUpdateTooltip( segment, event ) {
  var tooltip = document.querySelector( '#tooltip' ),
      elementPosition = getPosition( event.currentTarget );
  if( !tooltip ) {
    tooltip = document.createElement( 'div' );
    tooltip.id = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.backgroundColor = 'white';
    tooltip.style.padding = '0 4px 0 4px';
    tooltip.style.borderRadius = '3px';
    tooltip.style.boxShadow = '1px 1px 3px black';
    document.body.appendChild( tooltip );
  }

  tooltip.textContent = sectors[ segment.name ];
  tooltip.style.left = event.offsetX + 10 + elementPosition.x + document.body.scrollLeft + 'px';
  tooltip.style.top = event.offsetY + elementPosition.y + document.body.scrollTop + 'px';
}

function hideTooltip() {
  var tooltip = document.querySelector( '#tooltip' );
  if( !tooltip ) return;
  tooltip.parentNode.removeChild( tooltip );
}

function getPosition(element) {
  var xPosition = 0,
      yPosition = 0;
    
  while (element) {
    xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}

function init(){
  showPoliticians( createRandomPoliticiansData( 10 ) );
}

document.addEventListener( 'DOMContentLoaded', init );
