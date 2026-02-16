import { Calendar, BookOpen, Users, Award } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback.jsx";

export function HomePage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Spring Semester Registration Opens",
      date: "March 1, 2026",
      time: "9:00 AM",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcxMTY0MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      title: "Guest Lecture: AI in Education",
      date: "February 20, 2026",
      time: "2:00 PM",
      category: "Event",
      image: "https://images.unsplash.com/photo-1722248540590-ba8b7af1d7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMHN0dWR5fGVufDF8fHx8MTc3MTIxODEzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      title: "Annual Graduation Ceremony",
      date: "May 15, 2026",
      time: "10:00 AM",
      category: "Ceremony",
      image: "https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzcxMjMwMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const news = [
    {
      id: 1,
      title: "Excellence University Ranks Top 50 Nationally",
      excerpt: "Our university has been recognized for outstanding academic programs and research initiatives.",
      date: "February 10, 2026",
    },
    {
      id: 2,
      title: "New Computer Science Lab Opens",
      excerpt: "State-of-the-art facilities now available to students with latest technology and equipment.",
      date: "February 5, 2026",
    },
    {
      id: 3,
      title: "Student Research Team Wins National Competition",
      excerpt: "Congratulations to our students for their groundbreaking work in renewable energy.",
      date: "January 28, 2026",
    },
  ];

  const quickStats = [
    { icon: Users, label: "Students", value: "15,000+" },
    { icon: BookOpen, label: "Courses", value: "200+" },
    { icon: Users, label: "Faculty", value: "800+" },
    { icon: Award, label: "Programs", value: "50+" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl mb-4">Welcome to Excellence University</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Knowledge • Innovation • Excellence
            </p>
            <p className="text-lg text-blue-50 max-w-3xl mx-auto">
              Empowering minds, shaping futures. Join our community of learners, researchers, 
              and innovators dedicated to academic excellence and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow p-6 text-center">
                  <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl text-gray-900">Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-3">
                    {event.category}
                  </span>
                  <h3 className="text-xl text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{event.date} at {event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-gray-900 mb-8">Latest News</h2>
          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.excerpt}</p>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
