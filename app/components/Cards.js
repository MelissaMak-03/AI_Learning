'use client'

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const Flashcard = ({ front, back }) => {
    const [showBack, setShowBack] = useState(false);

    const handleCardClick = () => {
        setShowBack(prevState => !prevState);
    };

    return (
        <Card 
            onClick={handleCardClick}
            sx={{
                maxWidth: 345,
                margin: '20px auto',
                cursor: 'pointer',
                position: 'relative',
                width: '100%',
                height: '200px',
                perspective: '1000px',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backfaceVisibility: 'hidden',
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: showBack ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front Side */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backfaceVisibility: 'hidden',
                        backgroundColor: 'white'
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">{front}</Typography>
                    </CardContent>
                </Box>

                {/* Back Side */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backfaceVisibility: 'hidden',
                        backgroundColor: 'lightgrey',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">{back}</Typography>
                    </CardContent>
                </Box>
            </Box>
        </Card>
    );
};

export default Flashcard;
