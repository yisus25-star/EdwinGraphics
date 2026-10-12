
    const rawData = [
      "Acacías — Meta", "Acandí — Chocó", "Acevedo — Huila", "Achí — Bolívar", "Agrado — Huila",
      "Agua de Dios — Cundinamarca", "Aguachica — Cesar", "Aguada — Santander", "Aguadas — Caldas",
      "Aguazul — Casanare", "Agustín Codazzi — Cesar", "Aipe — Huila", "Albania — Caquetá",
      "Albania — La Guajira", "Albania — Santander", "Albán — Cundinamarca", "Albán — Nariño",
      "Almaguer — Cauca", "Alpujarra — Tolima", "Altamira — Huila", "Amalfi — Antioquia",
      "Ambalema — Tolima", "Anapoima — Cundinamarca", "Ancuyá — Nariño", "Andes — Antioquia",
      "Angelópolis — Antioquia", "Angostura — Antioquia", "Anolaima — Cundinamarca", "Anorí — Antioquia",
      "Anserma — Caldas", "Ansermanuevo — Valle del Cauca", "Anzá — Antioquia", "Anzoátegui — Tolima",
      "Apartadó — Antioquia", "Apía — Risaralda", "Apulo — Cundinamarca", "Aquitania — Boyacá",
      "Aracataca — Magdalena", "Aranzazu — Caldas", "Aratoca — Santander", "Arauca — Arauca",
      "Arboleda — Nariño", "Arboledas — Norte de Santander", "Arboletes — Antioquia", "Arcabuco — Boyacá",
      "Arenal — Bolívar", "Argelia — Antioquia", "Argelia — Cauca", "Argelia — Valle del Cauca",
      "Ariguaní — Magdalena", "Arjona — Bolívar", "Armenia — Antioquia", "Armenia — Quindío",
      "Armenia — Santander", "Armero — Tolima", "Arroyohondo — Bolívar", "Astrea — Cesar",
      "Ataco — Tolima", "Atrato — Chocó", "Ayapel — Córdoba", "Bagadó — Chocó", "Bahía Solano — Chocó",
      "Bajo Baudó — Chocó", "Balboa — Cauca", "Balboa — Risaralda", "Baranoa — Atlántico",
      "Barbosa — Antioquia", "Barbosa — Santander", "Barichara — Santander", "Barranca de Upía — Meta",
      "Barrancabermeja — Santander", "Barrancas — La Guajira", "Barranco de Loba — Bolívar",
      "Barranquilla — Atlántico", "Becerril — Cesar", "Belalcázar — Caldas", "Belén — Boyacá",
      "Belén — Nariño", "Belén de Bajirá — Chocó", "Belén de Umbría — Risaralda", "Bello — Antioquia",
      "Belmira — Antioquia", "Beltrán — Cundinamarca", "Berbeo — Boyacá", "Betania — Antioquia",
      "Betéitiva — Boyacá", "Betulia — Antioquia", "Betulia — Santander", "Bituima — Cundinamarca",
      "Boavita — Boyacá", "Bochalema — Norte de Santander", "Bogotá, D. C. — Bogotá", "Bojacá — Cundinamarca",
      "Bolívar — Cauca", "Bolívar — Santander", "Bolívar — Valle del Cauca", "Bosconia — Cesar",
      "Boyacá — Boyacá", "Briceño — Antioquia", "Briceño — Boyacá", "Bugalagrande — Valle del Cauca",
      "Buenaventura — Valle del Cauca", "Buenavista — Boyacá", "Buenavista — Córdoba", "Buenavista — Quindío",
      "Buenavista — Sucre", "Buenos Aires — Cauca", "Buesaco — Nariño", "Buga — Valle del Cauca",
      "Buriticá — Antioquia", "Busbanzá — Boyacá", "Cabrera — Cundinamarca", "Cabrera — Santander",
      "Cabuyaro — Meta", "Cáceres — Antioquia", "Cachipay — Cundinamarca", "Cáchira — Norte de Santander",
      "Cádiz — Santander", "Caicedo — Antioquia", "Caicedonia — Valle del Cauca", "Cajamarca — Tolima",
      "Cajibío — Cauca", "Cajicá — Cundinamarca", "Calamar — Bolívar", "Calamar — Guaviare",
      "Calarcá — Quindío", "Caldas — Antioquia", "Caldas — Boyacá", "Caldas — Santander",
      "Caldono — Cauca", "California — Santander", "Calima — Valle del Cauca", "Caloto — Cauca",
      "Campamento — Antioquia", "Campo de la Cruz — Atlántico", "Campoalegre — Huila", "Campohermoso — Boyacá",
      "Canalete — Córdoba", "Candelaria — Atlántico", "Candelaria — Valle del Cauca", "Cantagallo — Bolívar",
      "Cañasgordas — Antioquia", "Caparrapí — Cundinamarca", "Capela — Santander", "Capilla — Boyacá",
      "Capitanes — Santander", "Capitanejo — Santander", "Caracolí — Antioquia", "Caramanta — Antioquia",
      "Carcasí — Santander", "Carepa — Antioquia", "Carmen de Apicalá — Tolima", "Carmen de Carupa — Cundinamarca",
      "Carmen del Darién — Chocó", "Carurú — Vaupés", "Casabianca — Tolima", "Castilla la Nueva — Meta",
      "Caucasia — Antioquia", "Cepitá — Santander", "Cereté — Córdoba", "Cértegui — Chocó",
      "Chachagüí — Nariño", "Chaguaní — Cundinamarca", "Chalán — Sucre", "Chaparral — Tolima",
      "Charalá — Santander", "Charta — Santander", "Chía — Cundinamarca", "Chibolo — Magdalena",
      "Chigorodó — Antioquia", "Chimá — Córdoba", "Chimichagua — Cesar", "Chinácota — Norte de Santander",
      "Chinavita — Boyacá", "Chinú — Córdoba", "Chipaque — Cundinamarca", "Chipatá — Santander",
      "Chiquinquirá — Boyacá", "Chíquiza — Boyacá", "Chima — Santander", "Chinchiná — Caldas",
      "Chiriguaná — Cesar", "Chiscas — Boyacá", "Chita — Boyacá", "Chitagá — Norte de Santander",
      "Chitaraque — Boyacá", "Chivatá — Boyacá", "Chivor — Boyacá", "Choachí — Cundinamarca",
      "Chocontá — Cundinamarca", "Cicuco — Bolívar", "Ciénaga — Magdalena", "Ciénaga de Oro — Córdoba",
      "Ciénaga de Zapatosa — Cesar", "Cimitarra — Santander", "Circasia — Quindío", "Cisneros — Antioquia",
      "Ciudad Bolívar — Antioquia", "Clemencia — Bolívar", "Cocorná — Antioquia", "Coello — Tolima",
      "Cogua — Cundinamarca", "Colón — Nariño", "Colón — Putumayo", "Coloso — Sucre", "Cómbita — Boyacá",
      "Concepción — Antioquia", "Concepción — Santander", "Concordia — Antioquia", "Concordia — Magdalena",
      "Condoto — Chocó", "Confines — Santander", "Consacá — Nariño", "Contadero — Nariño",
      "Contratación — Santander", "Convención — Norte de Santander", "Copacabana — Antioquia",
      "Coper — Boyacá", "Córdoba — Bolívar", "Córdoba — Nariño", "Córdoba — Quindío", "Corinto — Cauca",
      "Coromoro — Santander", "Corozal — Sucre", "Corrales — Boyacá", "Cota — Cundinamarca",
      "Cotorra — Córdoba", "Covarachía — Boyacá", "Coveñas — Sucre", "Coyaima — Tolima",
      "Cravo Norte — Arauca", "Cuaspud — Nariño", "Cucunubá — Cundinamarca", "Cúcuta — Norte de Santander",
      "Cumaral — Meta", "Cumaribo — Vichada", "Cumbal — Nariño", "Cumbitara — Nariño", "Cunday — Tolima",
      "Curillo — Caquetá", "Curití — Santander", "Curumaní — Cesar", "Dabeiba — Antioquia",
      "Dagua — Valle del Cauca", "Dibulla — La Guajira", "Distracción — La Guajira", "Dolores — Tolima",
      "Donmatías — Antioquia", "Dosquebradas — Risaralda", "Duitama — Boyacá", "Durania — Norte de Santander",
      "Ebéjico — Antioquia", "El Águila — Valle del Cauca", "El Bagre — Antioquia", "El Banco — Magdalena",
      "El Cairo — Valle del Cauca", "El Calvario — Meta", "El Carmen de Atrato — Chocó",
      "El Carmen de Bolívar — Bolívar", "El Carmen — Norte de Santander", "El Carmen de Chucurí — Santander",
      "El Castillo — Meta", "El Cerrito — Valle del Cauca", "El Charco — Nariño", "El Colegio — Cundinamarca",
      "El Copey — Cesar", "El Doncello — Caquetá", "El Dorado — Meta", "El Dovio — Valle del Cauca",
      "El Espinal — Tolima", "El Guacamayo — Santander", "El Guamo — Bolívar", "El Guamo — Tolima",
      "El Molino — La Guajira", "El Paso — Cesar", "El Paujil — Caquetá", "El Peñol — Nariño",
      "El Peñón — Bolívar", "El Peñón — Cundinamarca", "El Peñón — Santander", "El Piñón — Magdalena",
      "El Playón — Santander", "El Retén — Magdalena", "El Retorno — Guaviare", "El Roble — Sucre",
      "El Rosal — Cundinamarca", "El Rosario — Nariño", "El Santuario — Antioquia", "El Tablón de Gómez — Nariño",
      "El Tambo — Cauca", "El Tambo — Nariño", "El Tarra — Norte de Santander", "El Zulia — Norte de Santander",
      "Elías — Huila", "Encino — Santander", "Enciso — Santander", "Entrerríos — Antioquia",
      "Envigado — Antioquia", "Espinal — Tolima", "Facatativá — Cundinamarca", "Falan — Tolima",
      "Filadelfia — Caldas", "Filandia — Quindío", "Firavitoba — Boyacá", "Flandes — Tolima",
      "Florencia — Caquetá", "Florencia — Cauca", "Floresta — Boyacá", "Florida — Valle del Cauca",
      "Floridablanca — Santander", "Fómeque — Cundinamarca", "Fonseca — La Guajira", "Fortul — Arauca",
      "Fosca — Cundinamarca", "Francisco Pizarro — Nariño", "Fresno — Tolima", "Frontino — Antioquia",
      "Fuente de Oro — Meta", "Fundación — Magdalena", "Funes — Nariño", "Funza — Cundinamarca",
      "Fuquene — Cundinamarca", "Fusagasugá — Cundinamarca", "Gachancipá — Cundinamarca", "Gachalá — Cundinamarca",
      "Gachantivá — Boyacá", "Gachetá — Cundinamarca", "Galán — Santander", "Galapa — Atlántico",
      "Galeras — Sucre", "Gama — Cundinamarca", "Garagoa — Boyacá", "Garzón — Huila", "Génova — Quindío",
      "Gigante — Huila", "Giraldo — Antioquia", "Girardot — Cundinamarca", "Girardota — Antioquia",
      "Girón — Santander", "Ginebra — Valle del Cauca", "Gómez Plata — Antioquia", "González — Cesar",
      "Gramalote — Norte de Santander", "Granada — Antioquia", "Granada — Cundinamarca", "Granada — Meta",
      "Guaca — Santander", "Guacamayas — Boyacá", "Guacarí — Valle del Cauca", "Guachetá — Cundinamarca",
      "Guachené — Cauca", "Guachucal — Nariño", "Guadalajara de Buga — Valle del Cauca", "Guadalupe — Antioquia",
      "Guadalupe — Huila", "Guadalupe — Santander", "Guaduas — Cundinamarca", "Guaitarilla — Nariño",
      "Gualmatán — Nariño", "Guamal — Magdalena", "Guamal — Meta", "Guamo — Tolima", "Guapi — Cauca",
      "Guapotá — Santander", "Guaranda — Sucre", "Guarne — Antioquia", "Guasca — Cundinamarca",
      "Guatapé — Antioquia", "Guataquí — Cundinamarca", "Guatavita — Cundinamarca", "Guateque — Boyacá",
      "Guática — Risaralda", "Guavatá — Santander", "Guayabal de Síquima — Cundinamarca", "Guayabetal — Cundinamarca",
      "Guayatá — Boyacá", "Gutiérrez — Cundinamarca", "Hacarí — Norte de Santander", "Hatillo de Loba — Bolívar",
      "Hato — Santander", "Hato Corozal — Casanare", "Hatonuevo — La Guajira", "Heliconia — Antioquia",
      "Herveo — Tolima", "Hobo — Huila", "Honda — Tolima", "Ibagué — Tolima", "Icononzo — Tolima",
      "Iles — Nariño", "Imués — Nariño", "Inírida — Guainía", "Inzá — Cauca", "Ipiales — Nariño",
      "Isnos — Huila", "Istmina — Chocó", "Ituango — Antioquia", "Iza — Boyacá", "Jamundí — Valle del Cauca",
      "Jardín — Antioquia", "Jericó — Antioquia", "Jericó — Boyacá", "Jerusalen — Cundinamarca",
      "Jesús María — Santander", "Jordán — Santander", "Juan de Acosta — Atlántico", "Junín — Cundinamarca",
      "La Apartada — Córdoba", "La Argentina — Huila", "La Belleza — Santander", "La Calera — Cundinamarca",
      "La Capilla — Boyacá", "La Ceja — Antioquia", "La Celia — Risaralda", "La Cruz — Nariño",
      "La Cumbre — Valle del Cauca", "La Dorada — Caldas", "La Esperanza — Norte de Santander",
      "La Estrella — Antioquia", "La Florida — Nariño", "La Gloria — Cesar", "La Jagua de Ibirico — Cesar",
      "La Jagua del Pilar — La Guajira", "La Llanada — Nariño", "La Macarena — Meta", "La Merced — Caldas",
      "La Mesa — Cundinamarca", "La Montañita — Caquetá", "La Palma — Cundinamarca", "La Paz — Cesar",
      "La Paz — Santander", "La Peña — Cundinamarca", "La Pintada — Antioquia", "La Plata — Huila",
      "La Playa — Norte de Santander", "La Primavera — Vichada", "La Salina — Casanare", "La Sierra — Cauca",
      "La Tebaida — Quindío", "La Unión — Antioquia", "La Unión — Nariño", "La Unión — Sucre",
      "La Unión — Valle del Cauca", "La Uvita — Boyacá", "La Vega — Cauca", "La Vega — Cundinamarca",
      "Labateca — Norte de Santander", "Labranzagrande — Boyacá", "Landázuri — Santander", "Lebrija — Santander",
      "Leiva — Nariño", "Lejanías — Meta", "Lenguazaque — Cundinamarca", "Leticia — Amazonas",
      "Líbano — Tolima", "Liborina — Antioquia", "Linares — Nariño", "Litoral del San Juan — Chocó",
      "Lloró — Chocó", "López de Micay — Cauca", "Lorica — Córdoba", "Los Andes — Nariño",
      "Los Córdobas — Córdoba", "Los Palmitos — Sucre", "Los Patios — Norte de Santander", "Los Santos — Santander",
      "Lourdes — Norte de Santander", "Luruaco — Atlántico", "Macanal — Boyacá", "Macaravita — Santander",
      "Maceo — Antioquia", "Machetá — Cundinamarca", "Madrid — Cundinamarca", "Magangué — Bolívar",
      "Magüí — Nariño", "Mahates — Bolívar", "Maicao — La Guajira", "Majagual — Sucre", "Málaga — Santander",
      "Malambo — Atlántico", "Mallama — Nariño", "Manatí — Atlántico", "Manaure — Cesar", "Manaure — La Guajira",
      "Maní — Casanare", "Manizales — Caldas", "Manta — Cundinamarca", "Manzanares — Caldas",
      "Mapiripán — Meta", "María la Baja — Bolívar", "Maripí — Boyacá", "Mariquita — Tolima",
      "Marmato — Caldas", "Marquetalia — Caldas", "Marsella — Risaralda", "Marulanda — Caldas",
      "Matanza — Santander", "Medellín — Antioquia", "Medina — Cundinamarca", "Medio Atrato — Chocó",
      "Medio Baudó — Chocó", "Medio San Juan — Chocó", "Melgar — Tolima", "Mercaderes — Cauca",
      "Mesetas — Meta", "Milán — Caquetá", "Miraflores — Boyacá", "Miraflores — Guaviare",
      "Miraflores — Santander", "Miranda — Cauca", "Mistrató — Risaralda", "Mitú — Vaupés",
      "Mogotes — Santander", "Molagavita — Santander", "Momil — Córdoba", "Mompós — Bolívar",
      "Mongua — Boyacá", "Monguí — Boyacá", "Moniquirá — Boyacá", "Montebello — Antioquia",
      "Montecristo — Bolívar", "Montenegro — Quindío", "Montería — Córdoba", "Montelíbano — Córdoba",
      "Morelia — Caquetá", "Mosquera — Cundinamarca", "Mosquera — Nariño", "Motavita — Boyacá",
      "Murillo — Tolima", "Murindó — Antioquia", "Mutatá — Antioquia", "Mutiscua — Norte de Santander",
      "Nariño — Antioquia", "Nariño — Cundinamarca", "Nariño — Nariño", "Natagaima — Tolima",
      "Nechí — Antioquia", "Neira — Caldas", "Neiva — Huila", "Nemocón — Cundinamarca", "Nilo — Cundinamarca",
      "Nimaima — Cundinamarca", "Nobsa — Boyacá", "Nocaima — Cundinamarca", "Norcasia — Caldas",
      "Nóvita — Chocó", "Nueva Granada — Magdalena", "Nuevo Colón — Boyacá", "Nunchía — Casanare",
      "Nuquí — Chocó", "Ocamonte — Santander", "Ocaña — Norte de Santander", "Oiba — Santander",
      "Oicatá — Boyacá", "Olaya — Antioquia", "Olaya Herrera — Nariño", "Onzaga — Santander",
      "Oporapa — Huila", "Orito — Putumayo", "Orocué — Casanare", "Ortega — Tolima", "Ospina — Nariño",
      "Otanche — Boyacá", "Ovejas — Sucre", "Pacho — Cundinamarca", "Paicol — Huila", "Pailitas — Cesar",
      "Paime — Cundinamarca", "Paipa — Boyacá", "Pajarito — Boyacá", "Palermo — Huila", "Palestina — Caldas",
      "Palestina — Huila", "Palmar — Santander", "Palmar de Varela — Atlántico", "Palocabildo — Tolima",
      "Pamplona — Norte de Santander", "Pamplonita — Norte de Santander", "Pandi — Cundinamarca",
      "Panqueba — Boyacá", "Páramo — Santander", "Paratebueno — Cundinamarca", "Pasca — Cundinamarca",
      "Pasto — Nariño", "Patía — Cauca", "Pauna — Boyacá", "Paya — Boyacá", "Paz de Ariporo — Casanare",
      "Paz de Río — Boyacá", "Pelaya — Cesar", "Pensilvania — Caldas", "Peñol — Antioquia",
      "Pereira — Risaralda", "Pesca — Boyacá", "Piamonte — Cauca", "Piedecuesta — Santander",
      "Piedras — Tolima", "Piendamó — Cauca", "Pijao — Quindío", "Pijiño del Carmen — Magdalena",
      "Pinchote — Santander", "Pinillos — Bolívar", "Piojó — Atlántico", "Pisba — Boyacá",
      "Pital — Huila", "Pitalito — Huila", "Pivijay — Magdalena", "Planadas — Tolima",
      "Planeta Rica — Córdoba", "Plato — Magdalena", "Policarpa — Nariño", "Polonuevo — Atlántico",
      "Ponedera — Atlántico", "Popayán — Cauca", "Pore — Casanare", "Potosí — Nariño", "Prado — Tolima",
      "Providencia — San Andrés, Providencia y Santa Catalina", "Pueblo Bello — Cesar", "Pueblo Nuevo — Córdoba",
      "Pueblo Rico — Risaralda", "Pueblorrico — Antioquia", "Puente Nacional — Santander", "Puerres — Nariño",
      "Puerto Asís — Putumayo", "Puerto Berrío — Antioquia", "Puerto Boyacá — Boyacá", "Puerto Caicedo — Putumayo",
      "Puerto Carreño — Vichada", "Puerto Colombia — Atlántico", "Puerto Concordia — Meta",
      "Puerto Escondido — Córdoba", "Puerto Gaitán — Meta", "Puerto Guzmán — Putumayo",
      "Puerto Leguízamo — Putumayo", "Puerto Libertador — Córdoba", "Puerto Lleras — Meta",
      "Puerto López — Meta", "Puerto Nare — Antioquia", "Puerto Nariño — Amazonas", "Puerto Parra — Santander",
      "Puerto Rico — Caquetá", "Puerto Rico — Meta", "Puerto Rondón — Arauca", "Puerto Salgar — Cundinamarca",
      "Puerto Santander — Norte de Santander", "Puerto Tejada — Cauca", "Puerto Triunfo — Antioquia",
      "Puerto Wilches — Santander", "Pulí — Cundinamarca", "Pupiales — Nariño", "Puracé — Cauca",
      "Purificación — Tolima", "Purísima — Córdoba", "Quebradanegra — Cundinamarca", "Quetame — Cundinamarca",
      "Quibdó — Chocó", "Quimbaya — Quindío", "Quinchía — Risaralda", "Quípama — Boyacá",
      "Quipile — Cundinamarca", "Ragonvalia — Norte de Santander", "Ramiriquí — Boyacá", "Recetor — Casanare",
      "Regidor — Bolívar", "Remedios — Antioquia", "Remolino — Magdalena", "Repelón — Atlántico",
      "Restrepo — Meta", "Restrepo — Valle del Cauca", "Retiro — Antioquia", "Ricaurte — Cundinamarca",
      "Ricaurte — Nariño", "Río de Oro — Cesar", "Río Iro — Chocó", "Río Quito — Chocó", "Río Sucio — Chocó",
      "Río Viejo — Bolívar", "Rioblanco — Tolima", "Riofrío — Valle del Cauca", "Riohacha — La Guajira",
      "Rionegro — Antioquia", "Rionegro — Santander", "Riosucio — Caldas", "Risaralda — Caldas",
      "Rivera — Huila", "Roldanillo — Valle del Cauca", "Roncesvalles — Tolima", "Rondon — Boyacá",
      "Rosas — Cauca", "Rovira — Tolima", "Sabana de Torres — Santander", "Sabanagrande — Atlántico",
      "Sabanalarga — Antioquia", "Sabanalarga — Atlántico", "Sabanalarga — Casanare", "Sabaneta — Antioquia",
      "Saboyá — Boyacá", "Sácama — Casanare", "Sáchica — Boyacá", "Sahagún — Córdoba", "Salamina — Caldas",
      "Salamina — Magdalena", "Salazar — Norte de Santander", "Saldaña — Tolima", "Salento — Quindío",
      "Salgar — Antioquia", "Samacá — Boyacá", "Samaná — Caldas", "Sampués — Sucre", "San Agustín — Huila",
      "San Alberto — Cesar", "San Andrés — San Andrés, Providencia y Santa Catalina",
      "San Andrés de Cuerquia — Antioquia", "San Andrés de Sotavento — Córdoba", "San Antero — Córdoba",
      "San Antonio — Tolima", "San Antonio de Tequendama — Cundinamarca", "San Benito — Santander",
      "San Benito Abad — Sucre", "San Bernardo — Cundinamarca", "San Bernardo — Nariño",
      "San Bernardo del Viento — Córdoba", "San Calixto — Norte de Santander", "San Carlos — Antioquia",
      "San Carlos — Córdoba", "San Carlos de Guaroa — Meta", "San Cayetano — Cundinamarca",
      "San Cayetano — Norte de Santander", "San Cristóbal — Bolívar", "San Diego — Cesar",
      "San Eduardo — Boyacá", "San Estanislao — Bolívar", "San Fernando — Bolívar", "San Francisco — Antioquia",
      "San Francisco — Cundinamarca", "San Francisco — Putumayo", "San Gil — Santander",
      "San Jacinto — Bolívar", "San Jacinto del Cauca — Bolívar", "San Jerónimo — Antioquia",
      "San Joaquín — Santander", "San José — Caldas", "San José de la Montaña — Antioquia",
      "San José de Miranda — Santander", "San José de Pare — Boyacá", "San José de Uré — Córdoba",
      "San José del Fragua — Caquetá", "San José del Guaviare — Guaviare", "San José del Palmar — Chocó",
      "San Juan de Arama — Meta", "San Juan de Betulia — Sucre", "San Juan de Nepomuceno — Bolívar",
      "San Juan de Río Seco — Cundinamarca", "San Juan de Urabá — Antioquia", "San Juan del Cesar — La Guajira",
      "San Juanito — Meta", "San Lorenzo — Nariño", "San Luis — Antioquia", "San Luis — Tolima",
      "San Luis de Gaceno — Boyacá", "San Luis de Palenque — Casanare", "San Marcos — Sucre",
      "San Martín — Cesar", "San Martín — Meta", "San Martín de Loba — Bolívar", "San Mateo — Boyacá",
      "San Miguel — Putumayo", "San Miguel de Sema — Boyacá", "San Onofre — Sucre", "San Pablo — Bolívar",
      "San Pablo — Nariño", "San Pablo de Borbur — Boyacá", "San Pedro — Antioquia", "San Pedro — Sucre",
      "San Pedro de Cartago — Nariño", "San Pedro de los Milagros — Antioquia", "San Pedro de Urabá — Antioquia",
      "San Pelayo — Córdoba", "San Rafael — Antioquia", "San Roque — Antioquia", "San Sebastián — Cauca",
      "San Sebastián de Buenavista — Magdalena", "San Vicente — Antioquia", "San Vicente de Chucurí — Santander",
      "San Vicente del Caguán — Caquetá", "San Zenón — Magdalena", "Sandoná — Nariño", "Santa Ana — Magdalena",
      "Santa Bárbara — Antioquia", "Santa Bárbara — Santander", "Santa Bárbara de Pinto — Magdalena",
      "Santa Catalina — Bolívar", "Santa Fe de Antioquia — Antioquia", "Santa Genoveva de Docordó — Chocó",
      "Santa Helena del Opón — Santander", "Santa Isabel — Tolima", "Santa Lucía — Atlántico",
      "Santa María — Boyacá", "Santa María — Huila", "Santa Marta — Magdalena", "Santa Rosa — Bolívar",
      "Santa Rosa — Cauca", "Santa Rosa de Cabal — Risaralda", "Santa Rosa de Osos — Antioquia",
      "Santa Rosa de Viterbo — Boyacá", "Santa Rosa del Sur — Bolívar", "Santa Rosalía — Vichada",
      "Santa Sofía — Boyacá", "Santander de Quilichao — Cauca", "Santiago — Norte de Santander",
      "Santiago de Tolú — Sucre", "Santo Domingo — Antioquia", "Santo Tomás — Atlántico",
      "Santuario — Antioquia", "Santuario — Risaralda", "Sapuyes — Nariño", "Saravena — Arauca",
      "Sardinata — Norte de Santander", "Sasaima — Cundinamarca", "Sativanorte — Boyacá",
      "Sativasur — Boyacá", "Segovia — Antioquia", "Sesquilé — Cundinamarca", "Sevilla — Valle del Cauca",
      "Siachoque — Boyacá", "Sibundoy — Putumayo", "Sibaté — Cundinamarca", "Silos — Norte de Santander",
      "Silvania — Cundinamarca", "Simacota — Santander", "Simijaca — Cundinamarca", "Simití — Bolívar",
      "Sincelejo — Sucre", "Sipí — Chocó", "Sitionuevo — Magdalena", "Soacha — Cundinamarca",
      "Soatá — Boyacá", "Socha — Boyacá", "Socorro — Santander", "Socotá — Boyacá", "Sogamoso — Boyacá",
      "Solano — Caquetá", "Soledad — Atlántico", "Solita — Caquetá", "Somondoco — Boyacá",
      "Sonsón — Antioquia", "Sopetrán — Antioquia", "Soplaviento — Bolívar", "Sopó — Cundinamarca",
      "Sora — Boyacá", "Soracá — Boyacá", "Sotaquirá — Boyacá", "Suaita — Santander", "Suan — Atlántico",
      "Suárez — Cauca", "Suárez — Tolima", "Suaza — Huila", "Subachoque — Cundinamarca", "Sucre — Cauca",
      "Sucre — Santander", "Sucre — Sucre", "Suesca — Cundinamarca", "Supatá — Cundinamarca",
      "Supía — Caldas", "Suratá — Santander", "Susacón — Boyacá", "Sutamarchán — Boyacá",
      "Sutatausa — Cundinamarca", "Sutatenza — Boyacá", "Tabio — Cundinamarca", "Tadó — Chocó",
      "Talaigua Nuevo — Bolívar", "Tame — Arauca", "Támara — Casanare", "Taminango — Nariño",
      "Tangua — Nariño", "Taraira — Vaupés", "Tarapacá — Amazonas", "Tarazá — Antioquia",
      "Tarqui — Huila", "Tarso — Antioquia", "Tausa — Cundinamarca", "Tello — Huila", "Tena — Cundinamarca",
      "Tenerife — Magdalena", "Tenjo — Cundinamarca", "Tenza — Boyacá", "Teorama — Norte de Santander",
      "Teruel — Huila", "Tesalia — Huila", "Tibaná — Boyacá", "Tibasosa — Boyacá", "Tibirita — Cundinamarca",
      "Tibú — Norte de Santander", "Tierralta — Córdoba", "Timaná — Huila", "Timbiquí — Cauca",
      "Timbío — Cauca", "Tinjacá — Boyacá", "Tipacoque — Boyacá", "Tiquisio — Bolívar", "Titiribí — Antioquia",
      "Toca — Boyacá", "Tocaima — Cundinamarca", "Tocancipá — Cundinamarca", "Togüí — Boyacá",
      "Toledo — Antioquia", "Toledo — Norte de Santander", "Tolú — Sucre", "Tolú Viejo — Sucre",
      "Tona — Santander", "Tópaga — Boyacá", "Topaipí — Cundinamarca", "Toribío — Cauca",
      "Toro — Valle del Cauca", "Tota — Boyacá", "Totoró — Cauca", "Trinidad — Casanare",
      "Trujillo — Valle del Cauca", "Tubará — Atlántico", "Túquerres — Nariño", "Turbaco — Bolívar",
      "Turbaná — Bolívar", "Turmequé — Boyacá", "Tuta — Boyacá", "Tutazá — Boyacá", "Ubalá — Cundinamarca",
      "Ubaque — Cundinamarca", "Ubaté — Cundinamarca", "Ulloa — Valle del Cauca", "Umbita — Boyacá",
      "Une — Cundinamarca", "Unguía — Chocó", "Unión Panamericana — Chocó", "Uramita — Antioquia",
      "Uribe — Meta", "Uribia — La Guajira", "Urrao — Antioquia", "Urumita — La Guajira",
      "Usme — Bogotá, D. C.", "Útica — Cundinamarca", "Valdivia — Antioquia", "Valparaíso — Antioquia",
      "Valparaíso — Caquetá", "Valle de San José — Santander", "Valle de San Juan — Tolima",
      "Valledupar — Cesar", "Valledel Guamuez — Putumayo", "Vegachí — Antioquia", "Vélez — Santander",
      "Venadillo — Tolima", "Venecia — Antioquia", "Venecia — Cundinamarca", "Ventaquemada — Boyacá",
      "Vergara — Cundinamarca", "Versalles — Valle del Cauca", "Vetas — Santander", "Vianí — Cundinamarca",
      "Victoria — Caldas", "Vigía del Fuerte — Antioquia", "Vijes — Valle del Cauca",
      "Villa Caro — Norte de Santander", "Villa de Leyva — Boyacá", "Villa de San Diego de Ubaté — Cundinamarca",
      "Villa del Rosario — Norte de Santander", "Villa Rica — Cauca", "Villagarzón — Putumayo",
      "Villagómez — Cundinamarca", "Villahermosa — Tolima", "Villamaría — Caldas", "Villanueva — Bolívar",
      "Villanueva — Casanare", "Villanueva — La Guajira", "Villanueva — Santander",
      "Villapinzón — Cundinamarca", "Villarrica — Tolima", "Villavicencio — Meta", "Villavieja — Huila",
      "Villeta — Cundinamarca", "Viotá — Cundinamarca", "Viracachá — Boyacá", "Vistahermosa — Meta",
      "Viterbo — Caldas", "Yacopí — Cundinamarca", "Yacuanquer — Nariño", "Yaguará — Huila",
      "Yalí — Antioquia", "Yarumal — Antioquia", "Yavaraté — Vaupés", "Yolombó — Antioquia",
      "Yondó — Antioquia", "Yopal — Casanare", "Yotoco — Valle del Cauca", "Yumbo — Valle del Cauca",
      "Zapatoca — Santander", "Zapayán — Magdalena", "Zaragoza — Antioquia", "Zetaquira — Boyacá",
      "Zipacón — Cundinamarca", "Zipaquirá — Cundinamarca", "Zona Bananera — Magdalena"
    ];

    const colombiaMap = {};
    rawData.forEach(item => {
      const parts = item.split("—");
      if (parts.length === 2) {
        const city = parts[0].trim();
        const dept = parts[1].trim();
        if (!colombiaMap[dept]) colombiaMap[dept] = [];
        if (!colombiaMap[dept].includes(city)) colombiaMap[dept].push(city);
      }
    });

    const API_BASE_URL = (document.querySelector('meta[name="api-base-url"]')?.content || 'http://localhost:3000').replace(/\/+$/, '');
    const TOKEN_KEY = 'edwingraphics_admin_token';
    let products = [];
    let categories = [];
    let orders = [];
    let cart = [];
    let globalShopify = '';
    let activeEditingId = null;
    let apiReady = false;
    let detailQuantity = 1;
    let detailImages = [];
    let detailImageIndex = 0;
    let zoomScale = 1;
    let zoomPanX = 0;
    let zoomPanY = 0;
    let zoomDragging = false;
    let zoomDragX = 0;
    let zoomDragY = 0;

    async function apiRequest(path, options = {}) {
      const headers = new Headers(options.headers || {});
      const token = sessionStorage.getItem(TOKEN_KEY);
      if (token) headers.set('Authorization', 'Bearer ' + token);
      if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
      const response = await fetch(API_BASE_URL + path, { ...options, headers });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.success === false) {
        if (response.status === 401 || response.status === 403) {
          sessionStorage.removeItem(TOKEN_KEY);
        }
        throw new Error(payload.message || 'No fue posible completar la solicitud.');
      }
      return payload.data;
    }

    function escapeHtml(value) {
      return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      })[char]);
    }

    function formatPriceDisplay(priceVal) {
      if (priceVal === null || priceVal === undefined || priceVal === '') return 'Consultar precio';
      const num = Number(priceVal);
      return Number.isFinite(num) ? '$' + num.toLocaleString('es-CO') : String(priceVal);
    }

    function mediaUrl(url) {
      if (!url) return '';
      if (/^https?:\/\//i.test(url)) return url;
      return API_BASE_URL + (url.startsWith('/') ? url : '/' + url);
    }

    function normalizeProduct(product) {
      const category = categories.find(item => Number(item.id) === Number(product.categoria_id));
      return {
        id: Number(product.id),
        name: product.nombre,
        tag: category?.nombre || product.categoria_nombre || 'CATÁLOGO',
        categoria_id: Number(product.categoria_id),
        price: product.precio,
        stock: Number(product.stock || 0),
        img: mediaUrl(product.imagen_principal_thumbnail || product.imagen_principal || ''),
        images: [],
        descripcion: product.descripcion || '',
        compatibilidadMoto: product.compatibilidad_moto || [],
        variantes: product.variantes || [],
        outOfStock: product.estado === false || Number(product.stock) <= 0,
        estado: product.estado !== false
      };
    }

    async function loadCategories() {
      const data = await apiRequest('/categorias');
      categories = Array.isArray(data) ? data : (data.categorias || []);
      renderCategoryControls();
    }

    async function loadProducts() {
      const data = await apiRequest('/productos?limit=100&sort=created_at&order=desc');
      const rows = Array.isArray(data) ? data : (data.productos || data.data?.productos || []);
      products = rows.map(normalizeProduct);
      apiReady = true;
      renderProducts();
      renderAdminList();
      renderAdminStats();
    }

    async function loadStorefront() {
      const grid = document.getElementById('productsGrid');
      if (grid) grid.innerHTML = '<div class="no-products">Cargando catálogo…</div>';
      try {
        await loadCategories();
        await loadProducts();
        await loadBestSellers();
        renderCategoryControls();
      } catch (error) {
        apiReady = false;
        if (grid) grid.innerHTML = '<div class="no-products">No pudimos conectar con el catálogo. Comprueba que el backend esté activo en ' + escapeHtml(API_BASE_URL) + ' y vuelve a cargar la página.</div>';
        showToast(error.message, 'fa-triangle-exclamation');
      }
    }

    function renderCategoryControls() {
      const filter = document.getElementById('catalogCategory');
      const motoFilter = document.getElementById('catalogMoto');
      if (motoFilter) {
        const selectedMoto = motoFilter.value;
        const motos = [...new Set(products.flatMap(product => product.compatibilidadMoto || []))].filter(Boolean).sort((a,b) => a.localeCompare(b, 'es'));
        motoFilter.innerHTML = '<option value="">Todos los modelos</option>' + motos.map(moto => '<option value="' + escapeHtml(moto) + '">' + escapeHtml(moto) + '</option>').join('');
        motoFilter.value = motos.includes(selectedMoto) ? selectedMoto : '';
      }
      const adminSelect = document.getElementById('newProdTag');
      const parentSelect = document.getElementById('newCategoryParent');
      const selected = filter?.value || '';
      if (filter) {
        filter.innerHTML = '<option value="">Todas las categorías</option>' + categories.map(category =>
          '<option value="' + Number(category.id) + '">' + escapeHtml(category.nombre) + '</option>'
        ).join('');
        filter.value = categories.some(category => String(category.id) === selected) ? selected : '';
      }
      if (adminSelect) {
        adminSelect.innerHTML = '<option value="">Selecciona una categoría</option>' + categories.map(category =>
          '<option value="' + Number(category.id) + '">' + escapeHtml(category.nombre) + '</option>'
        ).join('');
      }
      if (parentSelect) {
        parentSelect.innerHTML = '<option value="">Categoría principal / sin padre</option>' + categories.filter(category => !category.parent_id).map(category =>
          '<option value="' + Number(category.id) + '">' + escapeHtml(category.nombre) + '</option>'
        ).join('');
      }
      renderAdminCategories();
    }

    function renderAdminCategories() {
      const list = document.getElementById('adminCategoryList');
      if (!list) return;
      list.innerHTML = categories.map(category =>
        '<span class="admin-category-chip">' + (category.parent_nombre ? escapeHtml(category.parent_nombre) + ' / ' : '') + escapeHtml(category.nombre) +
        ' <button type="button" aria-label="Editar categoría ' + escapeHtml(category.nombre) + '" onclick="editCategory(' + Number(category.id) + ')" style="background:none;border:0;color:#fff;cursor:pointer;">✎</button>' +
        ' <button type="button" aria-label="Eliminar categoría ' + escapeHtml(category.nombre) +
        '" onclick="deleteCategory(' + Number(category.id) + ')" style="background:none;border:0;color:var(--red);cursor:pointer;">×</button></span>'
      ).join('');
    }

    async function editCategory(id) {
      const category = categories.find(item => Number(item.id) === Number(id));
      if (!category) return;
      const nombre = prompt('Nuevo nombre para la categoría:', category.nombre);
      if (nombre === null || !nombre.trim()) return;
      try {
        await apiRequest('/categorias/' + Number(id), { method: 'PUT', body: JSON.stringify({ nombre: nombre.trim() }) });
        await loadCategories();
        await loadProducts();
        showToast('Categoría actualizada.');
      } catch (error) {
        showToast(error.message, 'fa-triangle-exclamation');
      }
    }

    async function deleteCategory(id) {
      const category = categories.find(item => Number(item.id) === Number(id));
      if (!category || !confirm('¿Eliminar la categoría "' + category.nombre + '"? Solo se puede eliminar si no tiene productos ni subcategorías.')) return;
      try {
        await apiRequest('/categorias/' + Number(id), { method: 'DELETE' });
        await loadCategories();
        showToast('Categoría eliminada.');
      } catch (error) {
        showToast(error.message, 'fa-triangle-exclamation');
      }
    }

    async function addCategory() {
      const input = document.getElementById('newCategoryName');
      const name = input?.value.trim();
      if (!name) return showToast('Escribe el nombre de la categoría', 'fa-triangle-exclamation');
      const parent_id = document.getElementById('newCategoryParent')?.value || null;
      try {
        await apiRequest('/categorias', { method: 'POST', body: JSON.stringify({ nombre: name, parent_id: parent_id ? Number(parent_id) : null }) });
        if (input) input.value = '';
        const parentSelect = document.getElementById('newCategoryParent');
        if (parentSelect) parentSelect.value = '';
        await loadCategories();
        showToast('Categoría creada');
      } catch (error) {
        showToast(error.message, 'fa-triangle-exclamation');
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const intro = document.getElementById('introScreen');
      if (intro) setTimeout(() => intro.classList.add('hide'), 700);
      initColombiaSelects();
      document.getElementById('catalogSearch')?.addEventListener('input', renderProducts);
      document.getElementById('catalogCategory')?.addEventListener('change', renderProducts);
      document.getElementById('catalogMoto')?.addEventListener('change', renderProducts);
      document.getElementById('catalogSort')?.addEventListener('change', renderProducts);
      document.getElementById('clearCatalogFilters')?.addEventListener('click', () => { const search = document.getElementById('catalogSearch'); const category = document.getElementById('catalogCategory'); const moto = document.getElementById('catalogMoto'); const sort = document.getElementById('catalogSort'); if (search) search.value = ''; if (category) category.value = ''; if (moto) moto.value = ''; if (sort) sort.value = 'featured'; renderProducts(); });
      document.getElementById('checkoutForm')?.addEventListener('submit', submitOrder);
      document.getElementById('newProdImages')?.addEventListener('change', renderNewProductImagePreview);\n      document.getElementById('cpNewImages')?.addEventListener('change', renderEditedNewImagePreview);
      if (document.getElementById('productsGrid')) loadStorefront();
      const adminLoginView = document.getElementById('adminLoginView');
      const adminDashboardView = document.getElementById('adminDashboardView');
      if (sessionStorage.getItem(TOKEN_KEY) && adminLoginView && adminDashboardView) {
        adminLoginView.style.display = 'none';
        adminDashboardView.style.display = 'flex';
        apiRequest('/pedidos?limit=1').then(() => Promise.all([loadCategories(), loadProducts(), loadOrders()]))
          .catch(() => {
            sessionStorage.removeItem(TOKEN_KEY);
            adminLoginView.style.display = 'block';
            adminDashboardView.style.display = 'none';
          });
      }
    });

    function initColombiaSelects() {
      const deptSelect = document.getElementById('cDepartment');
      if (!deptSelect || deptSelect.options.length > 1) return;
      Object.keys(colombiaMap).sort().forEach(department => {
        const option = document.createElement('option');
        option.value = department;
        option.textContent = department;
        deptSelect.appendChild(option);
      });
    }

    function onDeptChange() {
      const deptSelect = document.getElementById('cDepartment');
      const cityInput = document.getElementById('cCity');
      const cityList = document.getElementById('cityOptions');
      const selectedDept = deptSelect.value;
      cityList.innerHTML = '';
      cityInput.value = '';
      if (selectedDept && colombiaMap[selectedDept]) {
        cityInput.disabled = false;
        cityInput.placeholder = 'Selecciona de la lista o escribe tu ciudad...';
        colombiaMap[selectedDept].slice().sort().forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          cityList.appendChild(option);
        });
      } else {
        cityInput.disabled = true;
        cityInput.placeholder = 'Selecciona primero un departamento...';
      }
    }

    async function loadBestSellers() {
      const section = document.getElementById('mas-vendidos');
      const grid = document.getElementById('topProductsGrid');
      if (!section || !grid) return;
      try {
        const data = await apiRequest('/productos/mas-vendidos?limit=4');
        const rows = Array.isArray(data) ? data : [];
        const best = rows.map(normalizeProduct);
        if (!best.length) { section.style.display = 'none'; return; }
        section.style.display = '';
        grid.innerHTML = best.map(product =>
          '<article class="catalog-card"><div class="product-img-box">' +
          (product.img ? '<img loading="lazy" src="' + escapeHtml(product.img) + '" alt="' + escapeHtml(product.name) + '">' : '<div class="product-placeholder">EDWINGRAPHICS</div>') +
          '</div><span class="product-tag">MÁS VENDIDO</span><h3 class="product-name">' + escapeHtml(product.name) + '</h3>' +
          '<p class="product-price">' + formatPriceDisplay(product.price) + '</p>' +
          '<div class="card-actions"><button class="btn-details" onclick="openDetailsModal(' + product.id + ')">Ver detalles</button>' +
          '<button class="btn-add-cart" ' + (product.outOfStock ? 'disabled' : '') + ' onclick="addToCartById(' + product.id + ')">Añadir</button></div></article>'
        ).join('');
      } catch (error) {
        section.style.display = 'none';
        console.warn('No se pudo cargar la sección de más vendidos:', error.message);
      }
    }

    function renderProducts() {
      const grid = document.getElementById('productsGrid');
      if (!grid) return;
      const query = (document.getElementById('catalogSearch')?.value || '').trim().toLocaleLowerCase('es');
      const categoryId = document.getElementById('catalogCategory')?.value || '';
      const moto = document.getElementById('catalogMoto')?.value || '';
      const sort = document.getElementById('catalogSort')?.value || 'featured';
      const filtered = products.filter(product => {
        const compatibility = product.compatibilidadMoto || [];
        const text = [product.name, product.tag, product.descripcion, ...compatibility].join(' ').toLocaleLowerCase('es');
        return (!query || text.includes(query)) &&
          (!categoryId || String(product.categoria_id) === categoryId) &&
          (!moto || compatibility.some(value => String(value).toLocaleLowerCase('es') === moto.toLocaleLowerCase('es')));
      });
      if (sort === 'name-asc') filtered.sort((a,b) => a.name.localeCompare(b.name, 'es'));
      if (sort === 'price-asc') filtered.sort((a,b) => Number(a.price) - Number(b.price));
      if (sort === 'price-desc') filtered.sort((a,b) => Number(b.price) - Number(a.price));
      const count = document.getElementById('catalogResultCount');
      if (count) count.textContent = filtered.length + (filtered.length === 1 ? ' producto encontrado' : ' productos encontrados');
      if (!filtered.length) {
        grid.innerHTML = '<div class="no-products">' + (apiReady ? 'No encontramos productos con esos filtros. Prueba otra búsqueda o limpia los filtros.' : 'El catálogo no está disponible.') + '</div>';
        return;
      }
      grid.innerHTML = filtered.map(product =>
        '<article class="catalog-card"><div class="product-img-box">' +
        (product.img ? '<img loading="lazy" src="' + escapeHtml(mediaUrl(product.img)) + '" alt="' + escapeHtml(product.name) + '">' : '<div class="product-placeholder">EDWINGRAPHICS</div>') +
        (product.outOfStock ? '<span class="out-of-stock-badge">Agotado</span>' : '') +
        '</div><span class="product-tag">' + escapeHtml(product.tag) + '</span>' +
        '<h3 class="product-name">' + escapeHtml(product.name) + '</h3>' +
        '<p class="product-price">' + formatPriceDisplay(product.price) + '</p>' +
        '<div class="card-actions"><button class="btn-details" onclick="openDetailsModal(' + product.id + ')">Ver detalles</button>' +
        '<button class="btn-add-cart" ' + (product.outOfStock ? 'disabled' : '') + ' onclick="addToCartById(' + product.id + ')">' +
        (product.outOfStock ? 'Agotado' : 'Añadir') + '</button></div></article>'
      ).join('');
    }

    async function openDetailsModal(id) {
      const product = products.find(item => item.id === Number(id));
      if (!product) return;
      document.getElementById('dTag').textContent = product.tag;
      document.getElementById('dTitle').textContent = product.name;
      document.getElementById('dPrice').textContent = formatPriceDisplay(product.price);
      const container = document.getElementById('dImgContainer');
      let images = [];
      try {
        images = await apiRequest('/productos/' + product.id + '/imagenes');
      } catch (_) { images = []; }
      if (!Array.isArray(images)) images = [];
      if (!images.length && product.img) images = [{ url: product.img, url_medium: product.img, url_large: product.img, color_nombre: 'Vista principal' }];
      detailImages = images.map((image, index) => ({
        ...image,
        full: mediaUrl(image.url_large || image.url_medium || image.url),
        thumb: mediaUrl(image.url_thumbnail || image.url_medium || image.url),
        label: String(image.color_nombre || ('Color / vista ' + (index + 1)))
      }));
      detailImageIndex = Math.max(0, detailImages.findIndex(image => image.es_principal));
      renderDetailGallery(product);
      const compatibility = product.compatibilidadMoto || [];
      const desc = document.getElementById('dDescription');
      if (desc) desc.textContent = (product.descripcion || '') + (compatibility.length ? '\n\nCompatible con: ' + compatibility.join(', ') : '');
      detailQuantity = 1;
      if (desc) {
        let quantityControl = document.getElementById('detailQuantityControl');
        if (!quantityControl) {
          quantityControl = document.createElement('div');
          quantityControl.id = 'detailQuantityControl';
          quantityControl.className = 'quantity-control';
          quantityControl.innerHTML = '<span>Cantidad</span><div class="quantity-stepper"><button type="button" id="detailQtyMinus" aria-label="Disminuir cantidad">−</button><output id="detailQtyValue" aria-live="polite">1</output><button type="button" id="detailQtyPlus" aria-label="Aumentar cantidad">+</button></div>';
          desc.insertAdjacentElement('afterend', quantityControl);
          document.getElementById('detailQtyMinus').addEventListener('click', () => { detailQuantity = Math.max(1, detailQuantity - 1); document.getElementById('detailQtyValue').textContent = detailQuantity; });
          document.getElementById('detailQtyPlus').addEventListener('click', () => { detailQuantity = Math.min(99, detailQuantity + 1); document.getElementById('detailQtyValue').textContent = detailQuantity; });
        }
        document.getElementById('detailQtyValue').textContent = '1';
      }
      const addButton = document.getElementById('dAddBtn');
      addButton.disabled = product.outOfStock;
      addButton.textContent = product.outOfStock ? 'Agotado' : 'Añadir al carrito';
      addButton.onclick = () => { addToCartById(product.id, detailQuantity); closeSysModals(); };
      openSysModal('detailsModal');
    }

    function renderDetailGallery(product) {
      const container = document.getElementById('dImgContainer');
      if (!container) return;
      if (!detailImages.length) {
        container.innerHTML = '<div class="product-placeholder">EDWINGRAPHICS</div>';
        return;
      }
      const active = detailImages[detailImageIndex] || detailImages[0];
      container.innerHTML =
        '<div class="detail-gallery-stage">' +
          '<button type="button" class="detail-gallery-arrow detail-gallery-prev" onclick="stepDetailImage(-1)" aria-label="Foto anterior" ' + (detailImages.length < 2 ? 'disabled' : '') + '>‹</button>' +
          '<img id="detailMainImage" loading="eager" decoding="async" src="' + escapeHtml(active.full) + '" alt="' + escapeHtml(product.name + ' — ' + active.label) + '" onclick="openImageZoom()" title="Haz clic para ampliar">' +
          '<button type="button" class="detail-gallery-arrow detail-gallery-next" onclick="stepDetailImage(1)" aria-label="Foto siguiente" ' + (detailImages.length < 2 ? 'disabled' : '') + '>›</button>' +
          '<button type="button" class="detail-zoom-trigger" onclick="openImageZoom()"><i class="fa-solid fa-magnifying-glass-plus"></i> Ampliar</button>' +
        '</div>' +
        '<div class="detail-image-caption"><strong id="detailImageLabel">' + escapeHtml(active.label) + '</strong><span>' + (detailImageIndex + 1) + ' / ' + detailImages.length + '</span></div>' +
        '<div class="detail-color-picker"><p>Elige el color o diseño</p><div class="detail-color-buttons">' +
          detailImages.map((image, index) => '<button type="button" class="detail-color-button ' + (index === detailImageIndex ? 'active' : '') + '" onclick="selectProductImage(this,' + index + ')" aria-pressed="' + (index === detailImageIndex ? 'true' : 'false') + '"><img loading="lazy" decoding="async" src="' + escapeHtml(image.thumb) + '" alt=""><span>' + escapeHtml(image.label) + '</span></button>').join('') +
        '</div></div>';
    }

    function selectProductImage(button, index) {
      const parsed = Number(index);
      if (!Number.isInteger(parsed) || parsed < 0 || parsed >= detailImages.length) return;
      detailImageIndex = parsed;
      const active = detailImages[parsed];
      const main = document.getElementById('detailMainImage');
      if (main) { main.src = active.full; main.alt = active.label; }
      const label = document.getElementById('detailImageLabel');
      if (label) label.textContent = active.label;
      const counter = document.querySelector('.detail-image-caption span');
      if (counter) counter.textContent = (parsed + 1) + ' / ' + detailImages.length;
      document.querySelectorAll('.detail-color-button').forEach((option, i) => {
        const selected = i === parsed;
        option.classList.toggle('active', selected);
        option.setAttribute('aria-pressed', String(selected));
      });
      document.querySelectorAll('.detail-gallery-arrow').forEach(arrow => arrow.disabled = detailImages.length < 2);
    }

    function stepDetailImage(direction) {
      if (!detailImages.length) return;
      const next = (detailImageIndex + direction + detailImages.length) % detailImages.length;
      selectProductImage(null, next);
    }

    function openImageZoom() {
      if (!detailImages.length) return;
      let overlay = document.getElementById('imageZoomOverlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'imageZoomOverlay';
        overlay.className = 'image-zoom-overlay';
        overlay.innerHTML = '<button type="button" class="zoom-close" aria-label="Cerrar zoom">×</button><button type="button" class="zoom-nav zoom-prev" aria-label="Foto anterior">‹</button><div class="zoom-canvas"><img id="zoomImage" alt="Imagen ampliada"></div><button type="button" class="zoom-nav zoom-next" aria-label="Foto siguiente">›</button><div class="zoom-toolbar"><button type="button" data-zoom="out" aria-label="Alejar">−</button><button type="button" data-zoom="reset">100%</button><button type="button" data-zoom="in" aria-label="Acercar">+</button><span class="zoom-hint">Usa la rueda del ratón o los botones para ampliar</span></div>';
        document.body.appendChild(overlay);
        overlay.querySelector('.zoom-close').addEventListener('click', closeImageZoom);
        overlay.querySelector('.zoom-prev').addEventListener('click', () => { stepDetailImage(-1); syncZoomImage(); });
        overlay.querySelector('.zoom-next').addEventListener('click', () => { stepDetailImage(1); syncZoomImage(); });
        overlay.querySelector('[data-zoom="out"]').addEventListener('click', () => setZoomScale(zoomScale - 0.25));
        overlay.querySelector('[data-zoom="in"]').addEventListener('click', () => setZoomScale(zoomScale + 0.25));
        overlay.querySelector('[data-zoom="reset"]').addEventListener('click', () => setZoomScale(1));
        overlay.addEventListener('click', event => { if (event.target === overlay) closeImageZoom(); });
        const canvas = overlay.querySelector('.zoom-canvas');
        canvas.addEventListener('wheel', event => { event.preventDefault(); setZoomScale(zoomScale + (event.deltaY < 0 ? 0.15 : -0.15)); }, { passive: false });
        const zoomImg = overlay.querySelector('#zoomImage');
        zoomImg.addEventListener('pointerdown', event => {
          if (zoomScale <= 1) return;
          zoomDragging = true; zoomDragX = event.clientX - zoomPanX; zoomDragY = event.clientY - zoomPanY;
          zoomImg.classList.add('dragging'); zoomImg.setPointerCapture(event.pointerId);
        });
        zoomImg.addEventListener('pointermove', event => {
          if (!zoomDragging) return;
          zoomPanX = event.clientX - zoomDragX; zoomPanY = event.clientY - zoomDragY; applyZoomTransform();
        });
        const stopDrag = () => { zoomDragging = false; zoomImg.classList.remove('dragging'); };
        zoomImg.addEventListener('pointerup', stopDrag); zoomImg.addEventListener('pointercancel', stopDrag);
      }
      overlay.classList.add('active');
      document.body.classList.add('zoom-open');
      syncZoomImage();
      setZoomScale(1);
    }

    function syncZoomImage() {
      const img = document.getElementById('zoomImage');
      const overlay = document.getElementById('imageZoomOverlay');
      if (!img || !overlay) return;
      img.src = detailImages[detailImageIndex]?.full || '';
      img.alt = detailImages[detailImageIndex]?.label || 'Imagen ampliada';
      overlay.querySelector('.zoom-prev').disabled = detailImages.length < 2;
      overlay.querySelector('.zoom-next').disabled = detailImages.length < 2;
    }

    function setZoomScale(value) {
      zoomScale = Math.max(1, Math.min(4, Number(value) || 1));
      if (zoomScale === 1) { zoomPanX = 0; zoomPanY = 0; }
      const reset = document.querySelector('#imageZoomOverlay [data-zoom="reset"]');
      if (reset) reset.textContent = Math.round(zoomScale * 100) + '%';
      applyZoomTransform();
    }

    function applyZoomTransform() {
      const img = document.getElementById('zoomImage');
      if (img) img.style.transform = 'translate(' + zoomPanX + 'px,' + zoomPanY + 'px) scale(' + zoomScale + ')';
    }

    function closeImageZoom() {
      const overlay = document.getElementById('imageZoomOverlay');
      if (overlay) overlay.classList.remove('active');
      document.body.classList.remove('zoom-open');
    }

    document.addEventListener('keydown', event => {
      if (!document.getElementById('imageZoomOverlay')?.classList.contains('active')) return;
      if (event.key === 'Escape') closeImageZoom();
      if (event.key === 'ArrowLeft') { stepDetailImage(-1); syncZoomImage(); }
      if (event.key === 'ArrowRight') { stepDetailImage(1); syncZoomImage(); }
    });

    function showToast(message, icon = 'fa-circle-check') {
      const container = document.getElementById('toastContainer');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = 'toast';
      const iconElement = document.createElement('i');
      iconElement.className = 'fa-solid ' + icon;
      iconElement.style.color = 'var(--red)';
      const text = document.createElement('span');
      text.textContent = message;
      toast.append(iconElement, text);
      container.appendChild(toast);
      setTimeout(() => toast.classList.add('show'), 10);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

    function addToCartById(id, quantity = 1) {
      const product = products.find(item => item.id === Number(id));
      if (product) addToCart(product.id, product.name, product.price, quantity);
    }

    function addToCart(id, name, price, quantity = 1) {
      const product = products.find(item => item.id === Number(id));
      if (!product || product.outOfStock) return showToast('Este producto no está disponible.', 'fa-triangle-exclamation');
      const amount = Math.max(1, Math.min(99, Number(quantity) || 1));
      const existing = cart.find(item => item.producto_id === product.id);
      if (existing) existing.cantidad += amount;
      else cart.push({ producto_id: product.id, nombre: product.name, precio: Number(price), cantidad: amount });
      updateCart();
      showToast(product.name + ' se añadió al carrito.');
    }

    function removeCartItem(id) {
      cart = cart.filter(item => item.producto_id !== Number(id));
      updateCart();
    }

    function updateCart() {
      const count = document.getElementById('cartCount');
      if (count) count.textContent = cart.reduce((total, item) => total + item.cantidad, 0);
      const container = document.getElementById('cartItems');
      if (!container) return;
      if (!cart.length) container.innerHTML = '<p style="color:#888;font-size:13px;">Tu carrito está vacío.</p>';
      else container.innerHTML = cart.map(item =>
        '<div class="cart-line"><span>' + escapeHtml(item.nombre) + ' × ' + item.cantidad + '</span><span>' +
        formatPriceDisplay(item.precio * item.cantidad) + ' <button type="button" aria-label="Quitar producto" onclick="removeCartItem(' + item.producto_id + ')">×</button></span></div>'
      ).join('');
      const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
      const subtotal = document.getElementById('cartSubtotal');
      if (subtotal) subtotal.textContent = formatPriceDisplay(total);
    }

    async function submitOrder(event) {
      event.preventDefault();
      if (!cart.length) return showToast('Añade productos antes de continuar', 'fa-triangle-exclamation');
      const fullName = document.getElementById('cName').value.trim();
      const nameParts = fullName.split(/\s+/);
      const firstName = nameParts.shift() || '';
      const lastName = nameParts.join(' ') || firstName;
      const payload = {
        cliente: {
          nombre: firstName,
          apellido: lastName,
          correo: document.getElementById('cEmail').value.trim(),
          telefono: document.getElementById('cPhone').value.trim()
        },
        direccion: {
          departamento: document.getElementById('cDepartment').value,
          ciudad: document.getElementById('cCity').value.trim(),
          direccion: document.getElementById('cAddress').value.trim()
        },
        metodo_pago: document.getElementById('cPayment').value,
        observaciones: document.getElementById('cObservations')?.value.trim() || '',
        envio: 0,
        items: cart.map(item => ({ producto_id: item.producto_id, cantidad: item.cantidad }))
      };
      let createdOrderId = null;
      const submitButton = event.submitter || document.querySelector('#checkoutForm button[type="submit"]');
      if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Creando pedido…'; }
      try {
        const pendingOrderId = sessionStorage.getItem('edwingraphics_pending_order');
        let order;
        if (pendingOrderId) {
          createdOrderId = Number(pendingOrderId);
          order = { id: createdOrderId };
        } else {
          order = await apiRequest('/pedidos', { method: 'POST', body: JSON.stringify(payload) });
          createdOrderId = order.id;
          sessionStorage.setItem('edwingraphics_pending_order', String(order.id));
        }
        const checkout = await apiRequest('/pedidos/' + order.id + '/checkout', { method: 'POST', body: JSON.stringify({}) });
        if (!checkout.checkoutUrl) throw new Error('El pedido se creó, pero Shopify no devolvió un enlace de pago. Contacta soporte con el pedido #' + order.id + '.');
        sessionStorage.removeItem('edwingraphics_pending_order');
        cart = [];
        updateCart();
        closeSysModals();
        if (String(checkout.checkoutUrl).includes('checkout.simulado.local')) {
          showToast('Pedido #' + order.id + ' creado en modo de prueba. No se realizó ningún cobro.');
          alert('Modo de prueba\n\nPedido #' + order.id + ' creado correctamente.\nNo se realizó ningún cobro.\n\nPara recibir pagos reales, configura Shopify en el backend.');
        } else {
          showToast('Pedido #' + order.id + ' creado. Abriendo el pago seguro…');
          window.location.href = checkout.checkoutUrl;
        }
      } catch (error) {
        if (createdOrderId && /reserva.*expir|reserva de stock.*expir/i.test(error.message)) {
          sessionStorage.removeItem('edwingraphics_pending_order');
          showToast('La reserva del pedido #' + createdOrderId + ' expiró. Vuelve a intentar para crear un pedido nuevo.', 'fa-triangle-exclamation');
        } else {
          showToast((createdOrderId ? 'Pedido #' + createdOrderId + ' guardado. Pulsa de nuevo para reintentar el pago sin duplicarlo: ' : '') + error.message, 'fa-triangle-exclamation');
        }
      } finally {
        if (submitButton) { submitButton.disabled = false; submitButton.innerHTML = '<i class="fa-solid fa-lock"></i> &nbsp;Crear pedido y pagar'; }
      }
    }

    function payCartOnline() {
      const form = document.getElementById('checkoutForm');
      if (form) form.requestSubmit();
    }

    async function loginAdmin() {
      const correo = document.getElementById('adminEmail').value.trim();
      const password = document.getElementById('adminPass').value;
      try {
        const data = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ correo, password }) });
        if (!data.token) throw new Error('El backend no devolvió un token de administrador.');
        sessionStorage.setItem(TOKEN_KEY, data.token);
        document.getElementById('adminLoginView').style.display = 'none';
        document.getElementById('adminDashboardView').style.display = 'flex';
        await Promise.all([loadCategories(), loadProducts(), loadOrders()]);
        showToast('Sesión administrativa iniciada');
      } catch (error) {
        sessionStorage.removeItem(TOKEN_KEY);
        showToast(error.message, 'fa-triangle-exclamation');
      }
    }

    async function saveGlobalShopify() {
      showToast('El pago Shopify se configura en el backend mediante variables de entorno.', 'fa-triangle-exclamation');
    }

    async function renderAdminList() {
      const list = document.getElementById('adminProdList');
      if (!list) return;
      if (!sessionStorage.getItem(TOKEN_KEY)) {
        list.innerHTML = '<p>Inicia sesión para gestionar productos.</p>';
        return;
      }
      list.innerHTML = '<p>Cargando inventario…</p>';
      list.innerHTML = products.map(product =>
        '<div class="admin-prod-item"><div><strong>' + escapeHtml(product.name) + '</strong> — ' + formatPriceDisplay(product.price) +
        '<span style="font-size:10px;color:' + (product.outOfStock ? 'var(--red)' : '#4caf50') + '"> (' + (product.outOfStock ? 'NO DISPONIBLE' : 'DISPONIBLE') + ', stock ' + product.stock + ')</span></div>' +
        '<div class="admin-prod-actions"><button class="btn-sm btn-sm-edit" onclick="openCustomPriceModal(' + product.id + ')">Editar</button>' +
        '<button class="btn-sm btn-sm-toggle" onclick="toggleStock(' + product.id + ')">' + (product.estado ? 'Desactivar' : 'Activar') + '</button>' +
        '<button class="btn-sm btn-sm-del" onclick="deleteProd(' + product.id + ')">Eliminar</button></div></div>'
      ).join('');
    }

    function renderNewProductImagePreview() {
      renderImageUploadPreview('newProdImages', 'newProdImagePreview', 'new-product-color-name');
    }

    function renderEditedNewImagePreview() {
      renderImageUploadPreview('cpNewImages', 'cpNewImagePreview', 'edited-product-color-name');
    }

    function renderImageUploadPreview(inputId, containerId, inputClass) {
      const input = document.getElementById(inputId);
      const container = document.getElementById(containerId);
      if (!input || !container) return;
      const files = Array.from(input.files || []);
      container.innerHTML = '';
      if (!files.length) return;
      if (files.length > 10) {
        showToast('Puedes subir máximo 10 fotos por carga.', 'fa-triangle-exclamation');
        input.value = '';
        return;
      }
      files.forEach((file, index) => {
        if (!file.type.startsWith('image/')) return;
        const card = document.createElement('div');
        card.className = 'new-product-preview-card';
        const img = document.createElement('img');
        img.loading = 'lazy'; img.alt = 'Vista previa de foto ' + (index + 1);
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
        img.onload = () => URL.revokeObjectURL(objectUrl);
        const label = document.createElement('label');
        label.textContent = 'Nombre del botón de color';
        const nameInput = document.createElement('input');
        nameInput.type = 'text'; nameInput.maxLength = 60; nameInput.required = true;
        nameInput.className = inputClass;
        nameInput.value = 'Color ' + (index + 1);
        nameInput.placeholder = 'Ej. Rojo, Azul, Negro';
        nameInput.setAttribute('aria-label', 'Nombre del color para foto ' + (index + 1));
        card.append(img, label, nameInput);
        container.appendChild(card);
      });
    }

    function readUploadColorNames(containerId, inputClass, files) {
      const names = Array.from(document.querySelectorAll('#' + containerId + ' .' + inputClass)).map((input, index) =>
        input.value.trim() || ('Color ' + (index + 1))
      );
      return files.map((_, index) => names[index] || ('Color ' + (index + 1)));
    }

    async function addNewProduct() {
      const nombre = document.getElementById('newProdName').value.trim();
      const precio = Number(document.getElementById('newProdPrice').value);
      const categoria_id = Number(document.getElementById('newProdTag').value);
      const descripcion = document.getElementById('newProdDescription').value.trim();
      const stock = Number(document.getElementById('newProdStock').value);
      const compatibilidad_moto = document.getElementById('newProdMoto').value.split(',').map(value => value.trim()).filter(Boolean);
      const files = document.getElementById('newProdImages').files;\n      const colorNames = readUploadColorNames('newProdImagePreview', 'new-product-color-name', Array.from(files));
      if (!nombre || !descripcion || !categoria_id || !Number.isFinite(precio) || precio <= 0 || !Number.isInteger(stock) || stock < 0) {
        return showToast('Completa nombre, descripción, precio, categoría y stock.', 'fa-triangle-exclamation');
      }
      if (!sessionStorage.getItem(TOKEN_KEY)) return showToast('Inicia sesión como administrador.', 'fa-triangle-exclamation');
      if (files.length > 10) return showToast('Puedes subir máximo 10 imágenes por producto.', 'fa-triangle-exclamation');
      let createdProductId = null;
      const button = document.querySelector('button[onclick="addNewProduct()"]');
      if (button) { button.disabled = true; button.textContent = 'Guardando…'; }
      try {
        const product = await apiRequest('/productos', { method: 'POST', body: JSON.stringify({
          nombre, descripcion, precio, stock, categoria_id, estado: true, compatibilidad_moto, variantes: []
        }) });
        createdProductId = product.id;
        if (files.length) {
          const formData = new FormData();
          Array.from(files).forEach(file => formData.append('imagenes', file));
          await apiRequest('/productos/' + product.id + '/imagenes', { method: 'POST', body: formData });
        }
        document.getElementById('newProdName').value = '';
        document.getElementById('newProdPrice').value = '';
        document.getElementById('newProdDescription').value = '';
        document.getElementById('newProdStock').value = '10';
        document.getElementById('newProdMoto').value = '';
        document.getElementById('newProdImages').value = '';
        renderNewProductImagePreview();
        await loadProducts();
        showToast('Producto guardado en la base de datos.');
      } catch (error) {
        if (createdProductId) {
          await loadProducts().catch(() => {});
          showToast('El producto #' + createdProductId + ' quedó creado, pero ocurrió un error adicional: ' + error.message, 'fa-triangle-exclamation');
        } else showToast(error.message, 'fa-triangle-exclamation');
      } finally {
        if (button) { button.disabled = false; button.textContent = 'Guardar Producto'; }
      }
    }

    async function openCustomPriceModal(id) {
      const product = products.find(item => item.id === Number(id));
      if (!product) return showToast('No se encontró el producto.', 'fa-triangle-exclamation');
      activeEditingId = product.id;
      document.getElementById('cpTitle').textContent = 'Editar producto #' + product.id;
      document.getElementById('cpNameInput').value = product.name || '';
      document.getElementById('cpDescriptionInput').value = product.descripcion || '';
      document.getElementById('cpPriceInput').value = Number(product.price) || 0;
      document.getElementById('cpStockInput').value = Number(product.stock) || 0;
      document.getElementById('cpMotoInput').value = (product.compatibilidadMoto || []).join(', ');
      document.getElementById('cpEstadoSelect').value = String(product.estado !== false);
      const categorySelect = document.getElementById('cpCategorySelect');
      if (categorySelect) {
        categorySelect.innerHTML = categories.map(category => '<option value="' + Number(category.id) + '">' + escapeHtml(category.nombre) + '</option>').join('');
        categorySelect.value = String(product.categoria_id);
      }
      const files = document.getElementById('cpNewImages');
      if (files) files.value = '';
      const imageGrid = document.getElementById('cpExistingImages');
      if (imageGrid) imageGrid.innerHTML = '<p class="editor-empty">Cargando fotos del producto…</p>';
      const modal = document.getElementById('customPriceModal');
      if (modal) modal.classList.add('active');
      await renderEditImageManager(product.id);
    }

    async function renderEditImageManager(productId) {
      const grid = document.getElementById('cpExistingImages');
      if (!grid) return;
      try {
        const data = await apiRequest('/productos/' + Number(productId) + '/imagenes');
        const images = Array.isArray(data) ? data : (data.imagenes || []);
        const count = document.getElementById('cpImageCount');
        if (count) count.textContent = images.length + (images.length === 1 ? ' foto' : ' fotos');
        if (!images.length) {
          grid.innerHTML = '<p class="editor-empty">Este producto todavía no tiene fotos. Añade imágenes y nombra cada botón de color para tus compradores.</p>';
          return;
        }
        grid.innerHTML = images.map((image, index) => {
          const src = mediaUrl(image.url_thumbnail || image.url_medium || image.url);
          const isPrimary = Boolean(image.es_principal);
          return '<article class="editor-image-card"><img loading="lazy" decoding="async" src="' + escapeHtml(src) + '" alt="Foto ' + (index + 1) + '">' +
            '<div class="editor-image-meta"><label>Botón de color<input class="existing-color-name" id="existingColorName' + Number(image.id) + '" maxlength="60" value="' + escapeHtml(image.color_nombre || ('Color ' + (index + 1))) + '"></label>' +
            '<button type="button" class="editor-image-action" onclick="saveEditedImageColor(' + Number(image.id) + ')">Guardar nombre</button>' +
            (isPrimary ? '<strong class="editor-primary-badge">Principal</strong>' : '<button type="button" class="editor-image-action" onclick="setEditedImagePrimary(' + Number(image.id) + ')">Usar principal</button>') +
            '<button type="button" class="editor-image-delete" onclick="deleteEditedImage(' + Number(image.id) + ')" aria-label="Eliminar foto ' + (index + 1) + '">Eliminar foto</button></div></article>';
        }).join('');
      } catch (error) {
        grid.innerHTML = '<p class="editor-empty editor-error">No se pudieron cargar las fotos: ' + escapeHtml(error.message) + '</p>';
      }
    }

    async function saveEditedImageColor(imageId) {
      const input = document.getElementById('existingColorName' + Number(imageId));
      if (!input) return;
      try {
        await apiRequest('/productos/imagenes/' + Number(imageId) + '/color', {
          method: 'PUT', body: JSON.stringify({ color_nombre: input.value.trim() })
        });
        await renderEditImageManager(activeEditingId);
        showToast('Nombre del botón de color guardado.');
      } catch (error) {
        showToast('No se pudo guardar el nombre: ' + error.message, 'fa-triangle-exclamation');
      }
    }

    async function uploadEditedProductImages() {
      if (!activeEditingId) return;
      const input = document.getElementById('cpNewImages');
      const files = Array.from(input?.files || []);
      if (!files.length) return showToast('Selecciona primero las fotos que quieres subir.', 'fa-triangle-exclamation');
      if (files.length > 10) return showToast('Puedes subir máximo 10 fotos por carga.', 'fa-triangle-exclamation');
      const button = document.getElementById('cpUploadImagesBtn');
      if (button) { button.disabled = true; button.textContent = 'Subiendo fotos…'; }
      try {
        const formData = new FormData();
        files.forEach(file => formData.append('imagenes', file));
        await apiRequest('/productos/' + activeEditingId + '/imagenes', { method: 'POST', body: formData });
        input.value = '';
        await renderEditImageManager(activeEditingId);
        await loadProducts();
        showToast(files.length + (files.length === 1 ? ' foto subida correctamente.' : ' fotos subidas correctamente.'));
      } catch (error) {
        showToast('No se pudieron subir las fotos: ' + error.message, 'fa-triangle-exclamation');
      } finally {
        if (button) { button.disabled = false; button.textContent = 'Subir fotos'; }
      }
    }

    async function setEditedImagePrimary(imageId) {
      if (!activeEditingId) return;
      try {
        await apiRequest('/productos/imagenes/' + Number(imageId) + '/principal', { method: 'PUT', body: JSON.stringify({}) });
        await renderEditImageManager(activeEditingId);
        await loadProducts();
        showToast('Foto principal actualizada.');
      } catch (error) {
        showToast('No se pudo cambiar la foto principal: ' + error.message, 'fa-triangle-exclamation');
      }
    }

    async function deleteEditedImage(imageId) {
      if (!confirm('¿Eliminar esta foto del producto?')) return;
      try {
        await apiRequest('/productos/imagenes/' + Number(imageId), { method: 'DELETE' });
        await renderEditImageManager(activeEditingId);
        await loadProducts();
        showToast('Foto eliminada.');
      } catch (error) {
        showToast('No se pudo eliminar la foto: ' + error.message, 'fa-triangle-exclamation');
      }
    }

    async function saveCustomPrice() {
      if (!activeEditingId) return;
      const nombre = document.getElementById('cpNameInput').value.trim();
      const descripcion = document.getElementById('cpDescriptionInput').value.trim();
      const precio = Number(document.getElementById('cpPriceInput').value);
      const stock = Number(document.getElementById('cpStockInput').value);
      const categoria_id = Number(document.getElementById('cpCategorySelect').value);
      const compatibilidad_moto = document.getElementById('cpMotoInput').value.split(',').map(value => value.trim()).filter(Boolean);
      const estado = document.getElementById('cpEstadoSelect').value === 'true';
      if (!nombre || !descripcion || !categoria_id || !Number.isFinite(precio) || precio < 0 || !Number.isInteger(stock) || stock < 0) {
        return showToast('Revisa nombre, descripción, precio, categoría y stock.', 'fa-triangle-exclamation');
      }
      const button = document.getElementById('cpSaveBtn');
      if (button) { button.disabled = true; button.textContent = 'Guardando…'; }
      try {
        await apiRequest('/productos/' + activeEditingId, { method: 'PUT', body: JSON.stringify({ nombre, descripcion, precio, stock, categoria_id, estado, compatibilidad_moto }) });
        const pendingFiles = Array.from(document.getElementById('cpNewImages')?.files || []);
        if (pendingFiles.length) {
          if (pendingFiles.length > 10) throw new Error('Puedes subir máximo 10 fotos por carga.');
          const formData = new FormData();
          pendingFiles.forEach(file => formData.append('imagenes', file));
          await apiRequest('/productos/' + activeEditingId + '/imagenes', { method: 'POST', body: formData });
        }
        await loadProducts();
        await renderEditImageManager(activeEditingId);
        showToast('Producto actualizado correctamente.');
        closeEditModal();
      } catch (error) {
        showToast('No se pudieron guardar los cambios: ' + error.message, 'fa-triangle-exclamation');
      } finally {
        if (button) { button.disabled = false; button.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar cambios'; }
      }
    }

    function closeEditModal() {
      const modal = document.getElementById('customPriceModal');
      if (modal) modal.classList.remove('active');
      activeEditingId = null;
    }

    async function toggleStock(id) {
      const product = products.find(item => item.id === Number(id));
      if (!product) return;
      try {
        await apiRequest('/productos/' + product.id, { method: 'PUT', body: JSON.stringify({ estado: !product.estado }) });
        await loadProducts();
        showToast(product.estado ? 'Producto desactivado.' : 'Producto activado.');
      } catch (error) {
        showToast(error.message, 'fa-triangle-exclamation');
      }
    }

    async function deleteProd(id) {
      if (!confirm('¿Deseas eliminar este producto del catálogo?')) return;
      try {
        await apiRequest('/productos/' + Number(id), { method: 'DELETE' });
        await loadProducts();
        showToast('Producto eliminado.');
      } catch (error) {
        showToast(error.message, 'fa-triangle-exclamation');
      }
    }

    async function loadOrders() {
      const container = document.getElementById('adminOrderList');
      if (!container) return;
      container.innerHTML = '<p>Cargando pedidos…</p>';
      try {
        const data = await apiRequest('/pedidos?limit=50');
        orders = data.pedidos || [];
        renderAdminStats();
        container.innerHTML = orders.length ? orders.map(order =>
          '<div class="admin-prod-item"><div><strong>Pedido #' + order.id + '</strong> — ' + formatPriceDisplay(order.total) +
          '<div style="font-size:12px;color:#aaa">Estado: ' + escapeHtml(order.estado) + ' · Pago: ' + escapeHtml(order.payment_status) + '</div></div>' +
          '<select aria-label="Estado del pedido ' + order.id + '" onchange="updateOrderStatus(' + order.id + ',this.value)">' +
          ['Pendiente','Pagado','Preparando','Enviado','Entregado','Cancelado'].map(status => '<option ' + (status === order.estado ? 'selected' : '') + '>' + status + '</option>').join('') +
          '</select></div>'
        ).join('') : '<p>No hay pedidos registrados.</p>';
      } catch (error) {
        container.innerHTML = '<p>' + escapeHtml(error.message) + '</p>';
      }
    }


    function renderAdminStats() {
      const productsStat = document.getElementById('adminStatProducts');
      const stockStat = document.getElementById('adminStatStock');
      const ordersStat = document.getElementById('adminStatOrders');
      const pendingStat = document.getElementById('adminStatPending');
      if (productsStat) productsStat.textContent = products.length;
      if (stockStat) stockStat.textContent = products.reduce((total, product) => total + Math.max(0, Number(product.stock) || 0), 0);
      if (ordersStat) ordersStat.textContent = orders.length;
      if (pendingStat) pendingStat.textContent = orders.filter(order => !['Pagado', 'Entregado', 'Cancelado'].includes(order.estado)).length;
    }

    function exportOrdersCsv() {
      if (!orders.length) return showToast('No hay pedidos cargados para exportar.', 'fa-triangle-exclamation');
      const columns = [
        ['Pedido', 'id'], ['Fecha', 'created_at'], ['Cliente', 'nombre_cliente'],
        ['Correo', 'correo_cliente'], ['Teléfono', 'telefono_cliente'],
        ['Estado', 'estado'], ['Pago', 'payment_status'], ['Total COP', 'total']
      ];
      const cell = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';
      const csv = '\uFEFF' + [columns.map(column => cell(column[0])).join(';'),
        ...orders.map(order => columns.map(column => cell(order[column[1]])).join(';'))
      ].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'edwingraphics-pedidos-' + new Date().toISOString().slice(0, 10) + '.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      showToast('Exportación de pedidos iniciada.');
    }

    async function updateOrderStatus(id, estado) {
      try {
        await apiRequest('/pedidos/' + id + '/estado', { method: 'PATCH', body: JSON.stringify({ estado }) });
        await loadOrders();
        showToast('Estado del pedido actualizado.');
      } catch (error) {
        showToast(error.message, 'fa-triangle-exclamation');
      }
    }

    function logoutAdmin() {
      sessionStorage.removeItem(TOKEN_KEY);
      document.getElementById('adminLoginView').style.display = 'block';
      document.getElementById('adminDashboardView').style.display = 'none';
      showToast('Sesión cerrada.');
    }

    function openSysModal(id) {
      closeSysModals();
      const m = document.getElementById(id);
      if (m) m.classList.add('active');
    }

    function closeSysModals() {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
    }
  