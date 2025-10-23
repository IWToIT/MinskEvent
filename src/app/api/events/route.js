import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const eventsWithCoordinates = events.map((event) => ({
      ...event,
      coordinates: JSON.parse(event.coordinates),
    }));

    return NextResponse.json({ events: eventsWithCoordinates });
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json(
      { error: "Ошибка загрузки событий" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, description, date, coordinates } = await request.json();

    let user = await prisma.user.findFirst();

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Временный пользователь",
          email: `temp-${Date.now()}@mail.com`,
          password: "temp-password",
        },
      });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date,
        coordinates: JSON.stringify(coordinates),
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const eventWithCoordinates = {
      ...event,
      coordinates: JSON.parse(event.coordinates),
    };

    return NextResponse.json({ success: true, event: eventWithCoordinates });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json(
      { error: "Ошибка создания события" },
      { status: 500 }
    );
  }
}
