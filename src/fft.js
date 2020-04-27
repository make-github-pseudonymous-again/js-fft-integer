
export default function _fft ( p , root , unzip ) {

	const fft = function ( l , m , u , ui , uj , v , vi , vj ) {

		if ( l === 0 ) {

			v[vi] = u[ui] ;
			return ;

		}

		let um = ui + m ;
		let vm = vi + m ;

		unzip( u , ui , uj , v , vi , vm ) ;

		fft( l - 1 , m >>> 1 , v , vi , vm , u , ui , um ) ;
		fft( l - 1 , m >>> 1 , v , vm , vj , u , um , uj ) ;

		const z = root[l] ;

		let w = 1 ;

		const _vm = vm ;

		while ( vi < _vm ) {

			v[vi] = ( u[ui] + w * u[um] ) % p ;
			v[vm] = ( u[ui] - w * u[um] ) % p ;

			w *= z ;
			w %= p ;

			++um ; ++vm ; ++ui ; ++vi ;

		}

	} ;

	return fft ;

}

