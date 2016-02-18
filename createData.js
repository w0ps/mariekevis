var lastNames = [
			'Van Apeldoorn', // E.B.
			'Atsma', // J.J.
			'Backer', // J.P.
			'Barth', // M.A.M.
			'Beuving', // J.
			'Van Bijsterveld', // S.C.
			'Bikker', // M.H.
			'Bredenoord', // A.L.
			'Brinkman', // L.C.
			'Broekers-Knol', // A.
			'Bruijn', // J.A.
			'Dercksen', // R.G.J.
			'Van Dijk', // D.J.H.
			'Don', // H.M.
			'Duthler', // A.W.
			'Elzinga', // A.A.
			'Engels', // J.W.M.
			'Ester', // P.
			'Faber-Van de Klashorst', // M.H.M.
			'Flierman', // A.H.
			'Ganzevoort', // R.R.
			'Gerkens', // A.M.V.
			'De Graaf', // Th.C.
			'De Grave', // F.H.G.
			'Van Hattem', // A.W.J.A.
			'Hoekstra', // W.B.
			'Ten Hoeve', // H.
			'Huijbregts-Schiedon', // W.H.
			'Jorritsma-Lebbink', // A.
			'Van Kappen', // F.E.
			'Van Kesteren', // N.J.J.
			'Knapen', // H.P.M.
			'Knip', // M.A.J.
			'Koffeman', // N.K.
			'Köhler', // F.F.
			'Kok', // C.J.
			'Kops', // A.
			'Kox', // M.J.M.
			'Krikke', // P.C.
			'Kuiper', // R.
			'Lintmeijer', // F.C.W.C.
			'Markuszower', // G.
			'Martens', // M.J.Th
			'Meijer', // M.P.
			'Nagel', // J.G.
			'Nooren', // J.E.A.M.
			'Oomen-Ruijten', // M.G.H.C.
			'Pijlman', // H.J.
			'Popken', // G.J.F.
			'Postema', // A.
			'Prast', // H.M.
			'Van Rij', // M.L.A.
			'Rinnooy Kan', // A.H.G.
			'Rombouts', // A.G.J.M.
			'Van Rooijen', // M.J.
			'Ruers', // R.F.
			'Schaap', // S.
			'Schalk', // P.P.
			'Schaper', // H.A.
			'Schnabel', // P.
			'Schouwenaar', // J.M.
			'Schrijver', // N.J.
			'Sent', // E.M.
			'Stienen', // C.P.W.J.
			'Van Strien', // G.A.
			'Strik', // M.H.A.
			'Swagerman', // B.J.
			'Teunissen', // Ch.
			'Van de Ven', // M.P.M.
			'Verheijen', // L.H.J.
			'Vos', // M.B.
			'Vreeman', // R.L.
			'De Vries-Leggedoor', // G.
			'Van Weerdeburg', // V.D.D.
			'Wezel', // A.M.T.
		];

function createRandomPoliticiansData( amount ) {
	var politicians = [];
	while( politicians.length < amount ) {
		politicians.push( new Politician() );
	}

	return politicians;
}

function Politician() {
	var lastName = lastNames[ Math.floor( Math.random() * lastNames.length ) ],
			initialsAmount = Math.ceil( Math.random() * Math.random() * 7 ),
			initials = '',
			nrOfEntanglements = Math.floor( Math.random() * 50 ),
			entanglementKeys = Object.keys( sectors ),
			sectorKey;

	while( initials.length < initialsAmount * 2 ) {
		initials += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[ Math.floor( Math.random() * 26 ) ] + '.';
	}

	this.name = initials + ' ' + lastName;
	this.entanglements = [];
	while( this.entanglements.length < nrOfEntanglements ) {
		sectorKey = entanglementKeys[ Math.floor( Math.random() * entanglementKeys.length ) ];

		this.entanglements.push( {
			sector: sectorKey,
			description: 'Worked at company ' + sectorKey
		} );
	}
}
