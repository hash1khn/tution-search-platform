'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


export default function Home() {
  const [isConnected, setIsConnected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/health');
        const data = await response.json();

        if (response.ok) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Error fetching health status:', error);
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(var(--background-color))', p: 4 }}>
        
        {/* Connection Status Indicator */}
        <Box sx={{ textAlign: 'center', mt: 4, p: 2, color: 'rgb(var(--background-color))' }}>
          {loading ? (
            <CircularProgress />
          ) : isConnected ? (
            <Typography variant="h6" color="success.main">
              Database Connected!
            </Typography>
          ) : (
            <Typography variant="h6" color="error.main">
              Database Not Connected!
            </Typography>
          )}
        </Box>

        {/* Credits Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="subtitle1">
            By Talha Idrees, Sohail Ahmed, and Zain
          </Typography>
        </Box>

        {/* Coming Soon Section */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="h5">
            Coming Soon!
          </Typography>
        </Box>
      </Container>
    </>
  );
}
