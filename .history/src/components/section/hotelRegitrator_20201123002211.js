import React from 'react'
import {Button} from 'react-bootstrap'
import hotel from '../../../hotels/Ile-de-France/hotel_paris.json'


export default function HotelRegitrator({firebase}) {
    const arrondissement = hotel.filter(element => element.fields.code_postal === "750")
     console.log(arrondissement)   
    return (
        <div>

                {arrondissement.forEach( doc => (
                firebase.hotelRegistrator({
                    arrondissement: "ninth",
                    hotelId: doc.recordid,
                    hotelName: doc.fields.nom_commercial,
                    classement: doc.fields.classement,
                    adresse: doc.fields.adresse,
                    room: doc.fields.nombre_de_chambres,
                    phone: doc.fields.telephone,
                    mail: doc.fields.courriel,
                    website: doc.fields.site_internet,
                    region: doc.fields.nom_reg,
                    departement: doc.fields.nom_dep,
                    code_postal: doc.fields.code_postal,
                    city: doc.fields.commune,
                    lat: doc.geometry.coordinates[1],
                    lng: doc.geometry.coordinates[0]})

                
            ))}
               
                
        </div>
    )
}
