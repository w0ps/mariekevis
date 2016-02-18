function instantiateTemplate( templateSelector, data ) {
  var node = document.importNode( document.querySelector( templateSelector ).content, true );

  data.forEach( setChildElement );

  return node;

  function setChildElement( key, value ) {
    var type = typeof value,
        element = node.querySelector( key );
    
    if( type === 'string' || type === 'number' ) {
      element.innerHTML = value;
      return;
    }

    if( type === 'function' ) {
      return value( element );
    }

    if( value && value.template ) {
      value.list.forEach( appendChild );
      return;
    }

    value && value.forEach( setElementProperty );

    function setElementProperty( key, subValue ) {
      if( /data-/.exec( key ) ) return element.dataset[ key.slice( 5 ) ] = subValue;
      element[ key ] = subValue;
    }

    function appendChild( item ) {
      var values = {};

      if( value.convert ) values = value.convert( item );
      else if( value.mapping ) value.mapping.forEach( declareValue );
      else values = item;

      return element.appendChild( instantiateTemplate( value.template, values ) );

      function declareValue( key, property ) {
        values[ key ] = item[ property ];
      }
    }
  }
}
