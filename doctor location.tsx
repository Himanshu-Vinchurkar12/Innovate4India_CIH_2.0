
'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, MapPin, LocateFixed, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type LocationPermissionStatus = 'prompt' | 'granted' | 'denied' | 'loading';

const specialties = [
    'General Physician',
    'Psychiatrist',
    'Dermatologist',
    'Neurologist',
    'Cardiologist',
    'Pediatrician',
    'Gynecologist',
];

export default function DoctorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('General Physician');
  const [userLocationInput, setUserLocationInput] = useState('Wellness City, HC 12345'); 
  const [currentUserCoords, setCurrentUserCoords] = useState<{latitude: number, longitude: number} | null>(null);
  const [locationPermission, setLocationPermission] = useState<LocationPermissionStatus>('prompt');
  const [pageDescription, setPageDescription] = useState('');
  const { t } = useLanguage();
  const { toast } = useToast();

  const processGeolocation = useCallback((position: GeolocationPosition) => {
    setCurrentUserCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    setUserLocationInput(`Your Location (Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)})`);
    setLocationPermission('granted');
    toast({ title: 'Location Access Granted', description: 'Showing map centered on your location.' });
  }, [toast]);

  const handleGeolocationError = useCallback((error: GeolocationPositionError) => {
    let message = 'Could not retrieve your location.';
    if (error.code === error.PERMISSION_DENIED) {
      message = 'Location access denied. Please enable it in your browser settings.';
      setLocationPermission('denied');
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      message = 'Location information is unavailable.';
      setLocationPermission('prompt');
    } else if (error.code === error.TIMEOUT) {
      message = 'The request to get user location timed out.';
      setLocationPermission('prompt');
    }
    toast({ title: 'Location Error', description: message, variant: 'destructive' });
    setLocationPermission(prev => (prev === 'loading' ? 'prompt' : prev));
  }, [toast]);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      setLocationPermission('loading');
      navigator.geolocation.getCurrentPosition(processGeolocation, handleGeolocationError, { timeout: 10000 });
    } else {
      toast({ title: 'Geolocation Not Supported', description: 'Your browser does not support geolocation.', variant: 'destructive' });
      setLocationPermission('denied');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (locationPermission === 'granted' && currentUserCoords) {
      setPageDescription(t.showingDoctorsCurrentLocation.replace('{lat}', currentUserCoords.latitude.toFixed(2)).replace('{lon}', currentUserCoords.longitude.toFixed(2)));
    } else if (locationPermission === 'denied') {
      setPageDescription(t.locationDenied.replace('{location}', userLocationInput));
    } else if (locationPermission === 'loading') {
      setPageDescription(t.gettingLocation);
    } else {
      setPageDescription(t.showingDoctorsNear.replace('{location}', userLocationInput));
    }
  }, [userLocationInput, locationPermission, currentUserCoords, t]);

  const handleRequestLocation = () => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      setLocationPermission('loading');
      toast({ title: 'Requesting Location', description: 'Attempting to get your current location...' });
      navigator.geolocation.getCurrentPosition(processGeolocation, handleGeolocationError, { timeout: 10000 });
    } else {
       toast({ title: 'Geolocation Not Supported', description: 'Your browser does not support geolocation.', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto">
      <PageHeader
        title={t.findDoctorsTitle}
        description={pageDescription}
        icon={Users}
      />

      <Card className="mb-8 shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 items-end">
            <div className="md:col-span-1">
              <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-1">{t.searchLocation}</label>
              <Input 
                id="location"
                placeholder="Enter city, zip, or use 'My Location'" 
                value={userLocationInput}
                onChange={(e) => {
                  setUserLocationInput(e.target.value); 
                  if(locationPermission === 'granted' && e.target.value !== `Your Location (Lat: ${currentUserCoords?.latitude.toFixed(2)}, Lon: ${currentUserCoords?.longitude.toFixed(2)})`) {
                    setLocationPermission('prompt');
                    setCurrentUserCoords(null);
                  }
                }}
                className="w-full"
                disabled={locationPermission === 'loading'}
              />
            </div>
             <div className="md:col-span-1">
                <label htmlFor="specialty" className="block text-sm font-medium text-muted-foreground mb-1">{t.doctorSpecialty}</label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty} disabled={locationPermission === 'loading'}>
                    <SelectTrigger id="specialty">
                        <SelectValue placeholder={t.selectSpecialtyPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                                {specialty}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="md:col-span-2">
              <Button className="w-full" onClick={handleRequestLocation} disabled={locationPermission === 'loading' || locationPermission === 'granted'}>
                {locationPermission === 'loading' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LocateFixed className="mr-2 h-4 w-4" />}
                 {locationPermission === 'granted' ? t.locationActive : t.useMyLocation}
              </Button>
            </div>
          </div>
           {locationPermission === 'granted' && currentUserCoords && (
            <p className="text-sm text-green-600 mt-3 flex items-center"><CheckCircle className="mr-1.5 h-4 w-4" /> {t.usingLocation}</p>
          )}
          {locationPermission === 'denied' && (
            <p className="text-sm text-yellow-600 mt-3 flex items-center"><AlertTriangle className="mr-1.5 h-4 w-4" /> {t.locationDeniedMessage}</p>
          )}
           {locationPermission === 'loading' && (
            <p className="text-sm text-blue-600 mt-3 flex items-center"><Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> {t.accessingLocation}</p>
          )}
        </CardContent>
      </Card>
      
       <div className="mb-8">
        <Card className="bg-muted/30 shadow-md overflow-hidden">
          <CardHeader className="items-center text-center p-4 border-b">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-1" />
            <CardTitle className="font-headline text-lg">{t.doctorMap}</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-0">
            <a 
              href={`https://www.google.com/maps/search/${encodeURIComponent(selectedSpecialty)}+doctor+near+${encodeURIComponent(userLocationInput)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Google Maps to find doctors near ${userLocationInput}`}
            >
              <div className="relative w-full h-64 md:h-80 bg-gray-200 dark:bg-gray-700 hover:opacity-90 transition-opacity">
                <Image
                  src="https://placehold.co/800x600.png"
                  alt="Map showing doctor locations"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="google maps"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4 text-white text-shadow-md">
                   <p className="font-semibold text-lg">{t.doctorMap}</p>
                   <p className="text-sm">Click to view nearby doctors on Google Maps</p>
                </div>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>
      
      {locationPermission === 'loading' && (
        <div className="flex justify-center items-center py-12">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="ml-3 text-muted-foreground">Finding your location...</p>
        </div>
      )}
    </div>
  );
}
