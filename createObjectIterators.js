function createObjectIterator( method ) {
  return function( fun ) {
    var self = this;

    return Object.keys( self )[ method ]( iterate );

    function iterate( key ) {
      return fun( key, self[ key ], self );
    }
  };
}

Object.prototype.forEach = createObjectIterator( 'forEach' );
Object.prototype.map = createObjectIterator( 'map' );
Object.prototype.filter = createObjectIterator( 'filter' );
