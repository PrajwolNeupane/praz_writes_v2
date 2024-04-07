import { NextResponse, NextRequest } from "next/server";
import dbConfig from "@/config/dbConfig";
import Vistor from "@/modals/vistorModal";
import jwt from "jsonwebtoken";
import parseToken from "@/utils/parseToken";

dbConfig();

function generateRandomNumberWithDate(): string {
  const currentDate = new Date();
  const randomNumber = Math.floor(Math.random() * 900) + 100; // Generate a random 3-digit number (between 100 and 999)
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
  const result = `${formattedDate}-${randomNumber}`;
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { device, token } = reqBody;
    if (device) {
      if (token) {
        const visitorId = parseToken(token);
        if (visitorId) {
          // If the visitorId cookie exists, update the visit_count
          const visitor = await Vistor.findById(visitorId);
          if (visitor) {
            visitor.visit_count = (
              parseInt(visitor.visit_count, 10) + 1
            ).toString();
            await visitor.save();
            const response = NextResponse.json(
              {
                message: "Visitor updated",
                token: token,
              },
              {
                status: 200,
              }
            );
            return response;
          } else {
            const newVisitor = new Vistor({
              device: device,
              visit_id: generateRandomNumberWithDate(),
              visit_count: "1",
            });
            const savedVisitor = await newVisitor.save();
            const tokenData = {
              id: savedVisitor._id,
            };
            const parsedToken = jwt.sign(tokenData, process.env.TOEKN_SECRET!);
            const response = NextResponse.json(
              {
                message: "Visitor Created",
                token: parsedToken,
              },
              {
                status: 200,
              }
            );

            return response;
          }
        } else {
          const newVisitor = new Vistor({
            device: device,
            visit_id: generateRandomNumberWithDate(),
            visit_count: "1",
          });
          const savedVisitor = await newVisitor.save();
          const tokenData = {
            id: savedVisitor._id,
          };
          const parsedToken = jwt.sign(tokenData, process.env.TOEKN_SECRET!);
          const response = NextResponse.json(
            {
              message: "Visitor Created",
              token: parsedToken,
            },
            {
              status: 200,
            }
          );

          return response;
        }
      } else {
        const newVisitor = new Vistor({
          device: device,
          visit_id: generateRandomNumberWithDate(),
          visit_count: "1",
        });
        const savedVisitor = await newVisitor.save();
        const tokenData = {
          id: savedVisitor._id,
        };
        const parsedToken = jwt.sign(tokenData, process.env.TOEKN_SECRET!);
        const response = NextResponse.json(
          {
            message: "Visitor Created",
            token: parsedToken,
          },
          {
            status: 200,
          }
        );

        return response;
      }
      // If the visitorId cookie doesn't exist, create a new visitor
    } else {
      console.log("-------ERROR😐😐");
      return NextResponse.json(
        {
          error: "Device is necessary",
        },
        {
          status: 400,
        }
      );
    }
  } catch (e: any) {
    console.log("Error Creating Visitor");
    console.log(e);
    return NextResponse.json(
      {
        message: "Server error while creating visitor",
      },
      {
        status: 500,
      }
    );
  }
}
