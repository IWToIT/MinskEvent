import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'events.json');

export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ events: [] });
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    
    if (!data.trim()) {
      return NextResponse.json({ events: [] });
    }
    
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData);
    
  } catch (error) {
    console.error('Error reading events:', error);
    return NextResponse.json({ events: [] });
  }
}

export async function POST(request) {
  try {
    const newEvent = await request.json();
    
    let jsonData = { events: [] };
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      if (data.trim()) {
        jsonData = JSON.parse(data);
      }
    }
    
    const eventWithId = {
      id: Date.now(),
      coordinates: newEvent.coordinates,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date
    };
    
    jsonData.events.push(eventWithId);
    
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    
    return NextResponse.json({ success: true, event: eventWithId });
  } catch (error) {
    console.error('Error saving event:', error);
    return NextResponse.json({ error: 'Ошибка сохранения' }, { status: 500 });
  }
}