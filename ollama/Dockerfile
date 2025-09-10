FROM ollama/ollama:latest
ARG OLLAMA_MODELS="llama3:8b-instruct"
ENV OLLAMA_KEEP_ALIVE=24h
RUN mkdir -p /opt/ollama-models && \
    ollama serve & sleep 5 && \
    for m in ${OLLAMA_MODELS}; do ollama pull "$m"; done && \
    pkill ollama || true && \
    cp -a /root/.ollama/. /opt/ollama-models/ || true
RUN printf '#!/bin/sh\nset -e\nmkdir -p /root/.ollama\nif [ -z \"$(ls -A /root/.ollama 2>/dev/null || true)\" ]; then cp -a /opt/ollama-models/. /root/.ollama/ 2>/dev/null || true; fi\nexec ollama serve\n' > /usr/local/bin/init-ollama.sh && chmod +x /usr/local/bin/init-ollama.sh
EXPOSE 11434
ENTRYPOINT ["/usr/local/bin/init-ollama.sh"]
