import { useState } from "react";
import { Cat, Heart, Info, Paw } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Docile" },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Intelligent, Independent" },
  { name: "Bengal", origin: "United States", temperament: "Energetic, Playful, Curious" },
  { name: "Scottish Fold", origin: "Scotland", temperament: "Sweet, Quiet, Adaptable" },
];

const Index = () => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-6 flex items-center justify-center text-purple-800">
          <Cat className="mr-2 text-pink-500" /> Feline Fascination
        </h1>
        <Card className="mb-8">
          <CardContent className="p-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
              alt="A cute cat"
              className="mx-auto object-cover w-full h-[400px] rounded-t-lg"
            />
          </CardContent>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Meet Your New Best Friend</CardTitle>
            <CardDescription className="text-center">
              Cats: Nature's perfect blend of cuddles and mischief
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Cats</CardTitle>
                <CardDescription>Fascinating feline facts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Cats have been cherished companions for thousands of years. These independent and agile creatures 
                  have captivated humans with their grace, playfulness, and affectionate nature. From ancient Egyptian 
                  reverence to modern-day internet sensations, cats continue to hold a special place in our hearts and homes.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle>Feline Features</CardTitle>
                <CardDescription>What makes cats unique</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Retractable claws for silent hunting</li>
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Exceptional balance and agility</li>
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Keen night vision and sensitive whiskers</li>
                  <li className="flex items-center"><Paw className="mr-2 text-pink-500" /> Complex vocal communication</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle>Popular Cat Breeds</CardTitle>
                <CardDescription>Discover the diversity of domestic cats</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {catBreeds.map((breed, index) => (
                    <li key={index} className="border-b pb-2 last:border-b-0">
                      <h3 className="font-semibold text-lg">{breed.name}</h3>
                      <p className="text-sm text-gray-600">Origin: {breed.origin}</p>
                      <div className="mt-1">
                        {breed.temperament.split(", ").map((trait, i) => (
                          <Badge key={i} variant="secondary" className="mr-1 mb-1">{trait}</Badge>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center">
              <Info className="mr-2 text-blue-500" /> Did You Know?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 text-center">
              A group of cats is called a "clowder," and they can make over 100 different vocal sounds!
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setLikes(likes + 1)}
            className="group transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Heart className="mr-2 text-red-500 group-hover:animate-ping" />
            Show Some Love ({likes})
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
