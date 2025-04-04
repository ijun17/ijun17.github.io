# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jungi"
  spec.version       = "0.1.0"
  spec.authors       = ["ijun17"]
  spec.email         = ["ijun17@naver.com"]

  spec.summary       = "Write a short summary, because Rubygems requires one."
  spec.homepage      = "https://ijun17.github.io"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }
  spec.add_runtime_dependency "jekyll", "~> 4.3.4"
end
