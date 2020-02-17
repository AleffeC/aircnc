import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketio from 'socket.io-client';
import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequest] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id }, 
    }), [user_id]); // colocando fora do useEffect como tentativa de execução unica

    useEffect(() => {
        // socket.on('hello', data => {
        //     console.log(data);
        // }); // "escuta" oque vem da mensagem hello enviada do backend e mostra em tempo real

        socket.on('booking_request', data => {
            setRequest([...requests, data]);
       }); 
    }, []);


    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);
        
        setRequest(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);
        
        setRequest(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                             <strong>{requests.user.email}</strong> está solicitando uma reserva em <strong>{requests.spot.company}</strong> para a data: <strong>{requests.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id) }>REJEITAR</button>
                    </li>
                ))}                      
            </ul>
            <ul className="spot-list">
                { spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{
                            backgroundImage: `url(${spot.thumbnail_url})`
                        }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))
                }
            </ul>

            <Link to="/new">                    
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    );
}