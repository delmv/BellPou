import React from 'react';
import '../index.css';
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import L from 'leaflet';
import greenIconSVG from '../images/binGreen.svg';
import redIconSVG from '../images/binRed.svg';


const iconGreen = new L.Icon({
	iconUrl: greenIconSVG,
	iconSize: new L.Point(30, 70),
});

const iconRed = new L.Icon({
	iconUrl: redIconSVG,
	iconSize: new L.Point(30, 70),
});

export default function SignOut({paginationState,getData}) {
	const defaultPosition = [50.4665284, 4.8661892];
	React.useEffect(() => {
		getData();
	}, [paginationState.page, paginationState.pageSize]);
	return (
		<div className="leaflet-container">
			<MapContainer
				center={defaultPosition}
				zoom={15}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{paginationState.rows.map(marker => (
					<Marker 
						key={marker.id} 
						position={[marker.position.coordinate_x,marker.position.coordinate_y]}
						icon={marker.is_full ? iconRed : iconGreen}
					>
						<Popup>
							Alerts : {marker.nb_alerts} <br/>
							QR Code : {marker.qr_code} <br/>
							Last empty : {marker.last_empty} <br/>
							Coordinates : ({marker.position.coordinate_x},{marker.position.coordinate_y}) <br/>
						</Popup>

					</Marker>
				))}

			</MapContainer>
		</div>
	);
}