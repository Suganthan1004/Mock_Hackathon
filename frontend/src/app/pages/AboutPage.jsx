import { Target, Eye, Award, Users } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl text-gray-900 text-center mb-12">About Excellence University</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 mb-6">
            Excellence University has been a beacon of academic excellence since its founding. 
            We are committed to providing world-class education and fostering an environment 
            where students can grow, innovate, and become leaders in their fields.
          </p>
          <p className="text-lg text-gray-700">
            Our diverse community of students and faculty from around the world creates a 
            rich learning environment that prepares graduates for success in a global society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700">
              To empower students with knowledge, skills, and values that enable them to 
              make meaningful contributions to society and lead fulfilling lives.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700">
              To be a globally recognized institution known for excellence in education, 
              research, and innovation that transforms lives and communities.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl text-gray-900 mb-6">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">Commitment to the highest standards in all endeavors</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Fostering inclusive and collaborative learning environments</p>
            </div>
            <div className="text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Encouraging creativity and forward-thinking solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

