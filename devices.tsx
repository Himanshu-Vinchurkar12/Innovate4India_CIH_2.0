
'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Smartphone, HeartPulse, Activity, BedDouble, Thermometer, AlertTriangle, PlusCircle, WifiOff, CheckCircle, Bluetooth, Loader2, XCircle } from 'lucide-react';
import type { WearableData } from '@/types/app-types';
import { useState, useEffect, useCallback } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';

// Mock initial data for a default device
const initialWearableData: WearableData = {
  heartRate: 72,
  steps: 1250,
  sleepHours: 7.5,
  spO2: 98,
};

const disconnectedWearableData: WearableData = {
  heartRate: null,
  steps: null,
  sleepHours: null,
  spO2: null,
};

interface DiscoveredDevice {
  id: string;
  name: string;
  details: string;
}

const MOCK_AVAILABLE_DEVICES: DiscoveredDevice[] = [
  { id: 'mock-band-alpha', name: 'HealthBand Alpha', details: 'Bluetooth, HR, Steps' },
  { id: 'mock-watch-zeta', name: 'SmartWatch Zeta', details: 'Wi-Fi, HR, Steps, SpO2' },
  { id: 'mock-fit-gamma', name: 'FitTracker Gamma', details: 'Bluetooth LE, All Metrics' },
  { id: 'healthfriend-smartband-v2', name: 'HealthFriend SmartBand V2', details: 'Default Device, All Metrics'},
];

const getStatusColor = (value: number | null, thresholds: { warn: number; alert: number }, higherIsBetter: boolean = true) => {
  if (value === null) return 'text-muted-foreground';
  if (higherIsBetter) {
    if (value < thresholds.alert) return 'text-red-500';
    if (value < thresholds.warn) return 'text-yellow-500';
    return 'text-green-500';
  } else {
    if (value > thresholds.alert) return 'text-red-500';
    if (value > thresholds.warn) return 'text-yellow-500';
    return 'text-green-500';
  }
};


export default function DevicesPage() {
  const [wearableData, setWearableData] = useState<WearableData>(initialWearableData);
  const [connectedDeviceName, setConnectedDeviceName] = useState<string | null>('HealthFriend SmartBand V2');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<DiscoveredDevice[]>([]);
  const [pairingStates, setPairingStates] = useState<Record<string, 'pairing' | 'paired' | 'failed' | undefined>>({});
  const { toast } = useToast();
  const { t } = useLanguage();

  // Simulate real-time data updates
  useEffect(() => {
    if (!connectedDeviceName) {
      setWearableData(disconnectedWearableData);
      return;
    }

    const interval = setInterval(() => {
      setWearableData(prevData => ({
        heartRate: prevData.heartRate ? prevData.heartRate + Math.floor(Math.random() * 5) - 2 : 60 + Math.floor(Math.random() * 40) ,
        steps: prevData.steps ? prevData.steps + Math.floor(Math.random() * 100) : Math.floor(Math.random() * 10000),
        sleepHours: prevData.sleepHours !== null ? parseFloat((prevData.sleepHours + (Math.random() * 0.5) - 0.25).toFixed(1)) : (6 + Math.random()*3),
        spO2: Math.min(100, Math.max(90, (prevData.spO2 || 95) + Math.floor(Math.random()*3)-1)),
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [connectedDeviceName]);
  
  const handleDisconnect = useCallback(() => {
    toast({ title: t.deviceDisconnected, description: `${connectedDeviceName} has been disconnected.` });
    setConnectedDeviceName(null);
    setPairingStates(prev => {
        const newStates = {...prev};
        Object.keys(newStates).forEach(key => {
            if (newStates[key] === 'paired') delete newStates[key];
        });
        return newStates;
    });
  }, [connectedDeviceName, toast, t]);

  const handleToggleConnection = () => {
    if (connectedDeviceName) {
      handleDisconnect();
    } else {
      // If no device is connected, open the dialog to add one
      setDiscoveredDevices([]); // Clear previous scan results
      setPairingStates({});
      setIsDialogOpen(true);
    }
  };

  const handleScanForDevices = async () => {
    setIsScanning(true);
    setDiscoveredDevices([]);
    setPairingStates({});

    // Mock permission requests
    await new Promise(resolve => setTimeout(resolve, 200));
    alert("HealthFriend needs Bluetooth permissions to find nearby wearables. (This is a mock request)");
    await new Promise(resolve => setTimeout(resolve, 200));
    alert("HealthFriend needs Location permissions to identify devices. (This is a mock request)");
    
    toast({ title: t.scanning, description: "Please wait while we search for wearables." });

    setTimeout(() => {
      setDiscoveredDevices(MOCK_AVAILABLE_DEVICES);
      setIsScanning(false);
      if (MOCK_AVAILABLE_DEVICES.length > 0) {
        toast({ title: t.scanComplete, description: `${MOCK_AVAILABLE_DEVICES.length} device(s) found.` });
      } else {
         toast({ title: t.scanComplete, description: "No devices found. Try moving closer or ensure device is in pairing mode.", variant: "destructive" });
      }
    }, 3000); // Simulate scan time
  };

  const handlePairDevice = async (device: DiscoveredDevice) => {
    setPairingStates(prev => ({ ...prev, [device.id]: 'pairing' }));
    
    await new Promise(resolve => setTimeout(resolve, 200));
    alert(`HealthFriend would like to pair with ${device.name} and access its health data (e.g., heart rate, steps). (This is a mock request)`);

    toast({ title: `${t.pairing} with ${device.name}...` });

    setTimeout(() => {
      setPairingStates(prev => ({ ...prev, [device.id]: 'paired' }));
      setConnectedDeviceName(device.name);
      // Simulate initial data for the new device
      setWearableData({
        heartRate: 60 + Math.floor(Math.random() * 40),
        steps: Math.floor(Math.random() * 2000),
        sleepHours: device.name.includes("Watch") ? 7.0 : 6.5, // Different defaults
        spO2: 95 + Math.floor(Math.random() * 5),
      });
      setIsDialogOpen(false);
      toast({ title: "Device Paired!", description: `${device.name} is now connected.`});
    }, 2500); // Simulate pairing time
  };


  const metrics = [
    { 
      label: t.heartRate, 
      value: wearableData.heartRate, 
      unit: 'bpm', 
      icon: HeartPulse, 
      thresholds: { warn: 60, alert: 50 }, 
      colorClass: getStatusColor(wearableData.heartRate, { warn: 55, alert: 45}, true) + ' ' + getStatusColor(wearableData.heartRate, { warn: 100, alert: 120}, false),
      progress: wearableData.heartRate ? (wearableData.heartRate / 150) * 100 : 0,
    },
    { 
      label: t.stepsToday, 
      value: wearableData.steps, 
      unit: '', 
      icon: Activity,
      colorClass: 'text-blue-500', // This should ideally use theme variable
      progress: wearableData.steps ? (wearableData.steps / 10000) * 100 : 0,
    },
    { 
      label: t.sleepLastNightMetric, 
      value: wearableData.sleepHours, 
      unit: 'hrs', 
      icon: BedDouble,
      colorClass: getStatusColor(wearableData.sleepHours, { warn: 6, alert: 5}),
      progress: wearableData.sleepHours ? (wearableData.sleepHours / 10) * 100 : 0,
    },
    { 
      label: 'SpO2', 
      value: wearableData.spO2, 
      unit: '%', 
      icon: Thermometer, 
      thresholds: { warn: 92, alert: 90 },
      colorClass: getStatusColor(wearableData.spO2, { warn: 92, alert: 90}),
      progress: wearableData.spO2 ? wearableData.spO2 : 0,
    },
  ];
  
  const isDeviceEffectivelyConnected = !!connectedDeviceName;


  return (
    <div className="container mx-auto">
      <PageHeader
        title={t.wearableDevicesTitle}
        description={t.wearableDevicesDescription}
        icon={Smartphone}
        actions={
          <>
            <Button variant="outline" onClick={handleToggleConnection}>
              {isDeviceEffectivelyConnected ? <WifiOff className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4 text-green-500" />}
              {isDeviceEffectivelyConnected ? t.disconnectDevice : t.connectDevice}
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setDiscoveredDevices([]); setPairingStates({}); setIsDialogOpen(true); }}>
                  <PlusCircle className="mr-2 h-4 w-4" /> {t.addNewDevice}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center"><Bluetooth className="mr-2 h-5 w-5 text-primary" /> {t.connectNewWearable}</DialogTitle>
                  <DialogDescription>
                    {t.scanDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  {!isScanning && discoveredDevices.length === 0 && (
                    <Button onClick={handleScanForDevices} className="w-full">
                      <Bluetooth className="mr-2 h-4 w-4" /> {t.scanForDevices}
                    </Button>
                  )}
                  {isScanning && (
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground p-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span>{t.scanning}</span>
                    </div>
                  )}
                  {!isScanning && discoveredDevices.length > 0 && (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                      <h4 className="font-medium text-sm">{t.discoveredDevices}</h4>
                      {discoveredDevices.map(device => (
                        <Card key={device.id} className="p-3 flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{device.name}</p>
                            <p className="text-xs text-muted-foreground">{device.details}</p>
                          </div>
                          <Button
                            size="sm"
                            variant={pairingStates[device.id] === 'paired' ? "ghost" : "default"}
                            onClick={() => handlePairDevice(device)}
                            disabled={pairingStates[device.id] === 'pairing' || pairingStates[device.id] === 'paired'}
                          >
                            {pairingStates[device.id] === 'pairing' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {pairingStates[device.id] === 'paired' && <CheckCircle className="mr-2 h-4 w-4 text-green-500" />}
                            {pairingStates[device.id] === 'pairing' ? t.pairing : pairingStates[device.id] === 'paired' ? t.paired : t.pair}
                          </Button>
                        </Card>
                      ))}
                       <Button onClick={handleScanForDevices} className="w-full mt-4" variant="outline">
                        <Bluetooth className="mr-2 h-4 w-4" /> {t.scanAgain}
                       </Button>
                    </div>
                  )}
                   {!isScanning && discoveredDevices.length === 0 && (
                     <p className="text-sm text-center text-muted-foreground pt-2">
                       {t.noDevicesFoundHelp}
                     </p>
                   )}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      {t.close}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      {!isDeviceEffectivelyConnected && (
         <Card className="mb-6 bg-yellow-50 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700">
            <CardHeader className="flex flex-row items-center">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
                <CardTitle className="text-yellow-700 dark:text-yellow-400">{t.deviceDisconnected}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-yellow-600 dark:text-yellow-300">
                {t.noRealTimeData}
                </p>
            </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map(metric => (
          <Card key={metric.label} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-headline">{metric.label}</CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.value === null ? 'text-muted-foreground' : metric.colorClass.split(' ')[0]}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${metric.value === null ? 'text-muted-foreground' : metric.colorClass.split(' ')[0]}`}>
                {metric.value === null ? 'N/A' : `${metric.value} ${metric.unit}`}
              </div>
              {metric.value !== null && metric.thresholds && (metric.value < metric.thresholds.alert || (metric.label === 'Heart Rate' && metric.value > 120)) && (
                <Badge variant="destructive" className="mt-1">
                  <AlertTriangle className="mr-1 h-3 w-3" /> Alert
                </Badge>
              )}
               {metric.value !== null && metric.thresholds && (metric.value >= metric.thresholds.alert && metric.value < metric.thresholds.warn) && (
                <Badge variant="outline" className="mt-1 border-yellow-500 text-yellow-600">
                   Warning
                </Badge>
              )}
              <Progress value={metric.progress} className="mt-3 h-2" indicatorClassName={metric.value === null ? 'bg-muted' : metric.colorClass.split(' ')[0].replace('text-', 'bg-')} />
              <p className="text-xs text-muted-foreground pt-2">
                {metric.label === "SpO2" && metric.value !== null && metric.value < 90 ? "Critically low SpO2!" : 
                 metric.label === "SpO2" && metric.value !== null && metric.value < 92 ? "Low SpO2, monitor." : 
                 isDeviceEffectivelyConnected ? "Updated moments ago" : "Awaiting connection"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
       <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">{t.deviceConnectionStatus}</CardTitle>
        </CardHeader>
        <CardContent>
          {isDeviceEffectivelyConnected && connectedDeviceName ? (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle className="mr-2 h-5 w-5" />
              <p>{t.connectedTo} <span className="font-semibold">{connectedDeviceName}</span></p>
            </div>
          ) : (
            <div className="flex items-center text-red-600 dark:text-red-400">
              <WifiOff className="mr-2 h-5 w-5" />
              <p>{t.noDeviceConnected}</p>
            </div>
          )}
           <p className="text-xs text-muted-foreground mt-4">
            {t.simulationNote}
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
