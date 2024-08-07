import { useState, useEffect, useCallback } from "react";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import confetti from 'canvas-confetti';

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Docile", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Intelligent, Independent", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "Bengal", origin: "United States", temperament: "Energetic, Playful, Curious", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
  { name: "Scottish Fold", origin: "Scotland", temperament: "Sweet, Quiet, Adaptable", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A cat's hearing is much more sensitive than humans and dogs.",
  "Cats have over 20 vocalizations, including the famous meow.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  const y = useMotionValue(0);
  const backgroundY = useTransform(y, [0, -300], [0, 100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setTrail((prevTrail) => [...prevTrail, { x: e.clientX, y: e.clientY }].slice(-20));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleLikeClick = () => {
    setLikes(likes + 1);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8 overflow-hidden" onMouseMove={(e) => y.set(e.clientY)}>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          y: backgroundY
        }}
      />
      {trail.map((point, index) => (
        <motion.div
          key={index}
          className="paw-print"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            left: point.x,
            top: point.y,
            pointerEvents: 'none'
          }}
        >
          <Paw size={16} className="text-pink-500" />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.h1 
          className="text-6xl font-bold mb-6 flex items-center justify-center text-purple-800"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Cat className="mr-2 text-pink-500" /> Feline Fascination
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Cat size={48} className="text-purple-800" />
          </motion.div>
        </motion.h1>
        
        <Carousel className="mb-8">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index}>
                <motion.div className="flip-card" whileHover={{ rotateY: 180 }}>
                  <motion.div className="flip-card-inner">
                    <motion.div className="flip-card-front">
                      <Card>
                        <CardContent className="p-0">
                          <img
                            src={breed.image}
                            alt={breed.name}
                            className="mx-auto object-cover w-full h-[400px] rounded-t-lg"
                          />
                        </CardContent>
                        <CardHeader>
                          <CardTitle className="text-2xl text-center">{breed.name}</CardTitle>
                        </CardHeader>
                      </Card>
                    </motion.div>
                    <motion.div className="flip-card-back" style={{ rotateY: 180 }}>
                      <Card className="h-full flex flex-col justify-center">
                        <CardHeader>
                          <CardTitle className="text-2xl text-center">{breed.name}</CardTitle>
                          <CardDescription className="text-center">
                            Origin: {breed.origin}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-center">Temperament: {breed.temperament}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

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
                  {["Retractable claws for silent hunting", "Exceptional balance and agility", "Keen night vision and sensitive whiskers", "Complex vocal communication"].map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paw className="mr-2 text-pink-500" /> {feature}
                    </motion.li>
                  ))}
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
                    <motion.li 
                      key={index} 
                      className="border-b pb-2 last:border-b-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="font-semibold text-lg">{breed.name}</h3>
                      <p className="text-sm text-gray-600">Origin: {breed.origin}</p>
                      <div className="mt-1">
                        {breed.temperament.split(", ").map((trait, i) => (
                          <Badge key={i} variant="secondary" className="mr-1 mb-1">{trait}</Badge>
                        ))}
                      </div>
                    </motion.li>
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
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFactIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-gray-700 text-center"
              >
                {catFacts[currentFactIndex]}
              </motion.p>
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLikeClick}
            className="group transition-all duration-300 ease-in-out transform hover:scale-105 bg-white bg-opacity-70 backdrop-blur-md"
          >
            <Heart className="mr-2 text-red-500 group-hover:animate-ping" />
            Show Some Love ({likes})
          </Button>
        </div>

        <motion.div 
          className="mt-8 text-center text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="bg-white bg-opacity-70 backdrop-blur-md inline-block px-4 py-2 rounded-full">
            Made with <Heart className="inline-block text-red-500" /> by cat enthusiasts
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
