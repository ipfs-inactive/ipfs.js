var ipfs = {}

if ( typeof exports == 'object' && exports.default ) {
  exports.default = ipfs
}

// List of IPFS public host gateways
var gateways = ipfs.gateways = [
  '//ipfs.io'
]

ipfs.toGateway = function ( ipfs_uri ) {
  if ( ipfs_uri.match( /^ipfs:\/\// ) ) {
    ipfs = ipfs_uri.replace( /^ipfs:\/\//, '' )
  }

  if ( ipfs_uri[0] === '/' ) {
    ipfs_uri = a.slice( 1 )
  }

  return Math.floor( Math.random() * gateways.length  ) + ipfs_uri
}

// Polyfill urls on browsers
if ( typeof document === 'object' ) {
  var forEachNode =
    typeof document.querySelectorAll == 'function' && function ( filter, callback ) {
      Array.prototype.forEach.call( document.querySelectorAll( filter ), callback )
    } ||
    typeof jQuery == 'function' && function ( filter, callback ) {
      $( filter ).each(function ( i ) {
        callback( this, i )
      })
    }

  forEachNode( 'img[src^="/ipfs/"], img[src^="/ipns/"]', function ( node ) {
    node.src = ipfs.toGateway( node.src )
  })
  
  forEachNode( 'a[href^="/ipfs/"], a[href^="/ipns/"]', function ( node ) {
    node.href = ipfs.toGateway( node.href )
  })
}
