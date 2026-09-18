window.VLDC_CHAPTERS = window.VLDC_CHAPTERS || [];
window.VLDC_CHAPTERS.push({
  "id": "ch06",
  "number": 6,
  "short": "VL lượng tử",
  "title": "Vật lý lượng tử",
  "glossary": [
    {
      "k": "$T$",
      "mean": "nhiệt độ tuyệt đối",
      "unit": "K",
      "note": "Dùng kelvin trong Stefan–Boltzmann và Wien; $T=t+273{,}15$ khi t đo bằng °C."
    },
    {
      "k": "$\\sigma$",
      "mean": "hằng số Stefan–Boltzmann",
      "unit": "W/(m$^2$·K$^4$)",
      "note": "$\\sigma\\approx 5{,}67\\times 10^{-8}$"
    },
    {
      "k": "$b$",
      "mean": "hằng số Wien",
      "unit": "m·K",
      "note": "$\\lambda_{\\max}T=b\\approx 2{,}9\\times 10^{-3}$"
    },
    {
      "k": "$h$",
      "mean": "hằng số Planck",
      "unit": "J·s",
      "note": "SI: $h=6{,}62607015\\times10^{-34}$ J·s chính xác. Khi đề cho h làm tròn, dùng đúng h của đề."
    },
    {
      "k": "$\\varepsilon$",
      "mean": "lượng tử năng lượng",
      "unit": "J",
      "note": "$\\varepsilon=hf=hc/\\lambda$"
    },
    {
      "k": "$A$",
      "mean": "công thoát (công giải phóng electron)",
      "unit": "J hoặc eV",
      "note": "KHÔNG phải công nhiệt động $A=-\\int P\\,dV$"
    },
    {
      "k": "$\\lambda_0$",
      "mean": "giới hạn quang điện",
      "unit": "m",
      "note": "$\\lambda_0=hc/A$; ngưỡng lý tưởng $\\lambda\\le\\lambda_0$. Tại ngưỡng $K_{\\max}=0$."
    },
    {
      "k": "$W_{\\max}$",
      "mean": "động năng cực đại quang electron",
      "unit": "J",
      "note": "$\\frac12 m v_{\\max}^2$"
    }
  ],
  "formulas": [
    {
      "name": "Stefan–Boltzmann (vật đen)",
      "latex": "$$\\mathcal{E}=\\sigma T^4,\\quad P=\\sigma S T^4$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\mathcal{E}$",
          "mean": "năng suất bức xạ",
          "unit": "W/m$^2$"
        },
        {
          "k": "$T$",
          "mean": "nhiệt độ",
          "unit": "K"
        }
      ],
      "when": "P là công suất phát ra. Vật xám: nhân hệ số phát xạ $0\\le\\epsilon_r\\le1$. Công suất trao đổi ròng với môi trường cần trừ phần hấp thụ; với mô hình xám đơn giản: $P_{ròng}=\\epsilon_r\\sigma S(T^4-T_{mt}^4)$."
    },
    {
      "name": "Wien",
      "latex": "$$\\lambda_{\\max}T=b$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\lambda_{\\max}$",
          "mean": "bước sóng cực đại phổ",
          "unit": "m"
        }
      ],
      "when": "Cực đại phổ biểu diễn theo bước sóng của vật đen. Nhiệt độ đo bằng kelvin. Vị trí cực đại không tự quyết định màu tổng hợp mà mắt thấy."
    },
    {
      "name": "Planck",
      "latex": "$$\\varepsilon=hf=\\dfrac{hc}{\\lambda}$$",
      "symbols": "",
      "sym": [
        {
          "k": "$h$",
          "mean": "Planck",
          "unit": "J·s"
        },
        {
          "k": "$f$",
          "mean": "tần số",
          "unit": "Hz"
        }
      ],
      "when": "λ là bước sóng chân không khi viết hc/λ; trong môi trường dùng hf. Các bài số dùng c ≈ 3 × 10⁸ m/s."
    },
    {
      "name": "Einstein quang điện (công thoát)",
      "latex": "$$hf=A+\\dfrac12 m v_{\\max}^2$$",
      "symbols": "",
      "sym": [
        {
          "k": "$A$",
          "mean": "công thoát kim loại",
          "unit": "J"
        },
        {
          "k": "$v_{\\max}$",
          "mean": "tốc độ cực đại quang electron",
          "unit": "m/s"
        }
      ],
      "when": "Quang điện ngoài, hấp thụ một photon, bỏ hiệu ứng đa photon. A là công thoát bề mặt kim loại; không dùng A này thay độ rộng vùng cấm của photodiode bán dẫn."
    },
    {
      "name": "Giới hạn quang điện",
      "latex": "$$\\lambda_0=\\dfrac{hc}{A},\\quad f_0=\\dfrac A h,\\quad hf\\ge A\\ \\Leftrightarrow\\ \\lambda\\le\\lambda_0$$",
      "symbols": "",
      "sym": [
        {
          "k": "$\\lambda_0$",
          "mean": "giới hạn quang điện",
          "unit": "m"
        }
      ],
      "when": "Mô hình một photon: dưới ngưỡng không phát quang electron; tại ngưỡng K cực đại bằng 0; trên ngưỡng K cực đại dương. Tăng cường độ ở cùng f làm tăng tốc độ photon tới, không tăng năng lượng mỗi photon."
    },
    {
      "name": "Lyman (nếu sách BT)",
      "latex": "$$\\dfrac{1}{\\lambda}=R\\left(\\dfrac{1}{1^2}-\\dfrac{1}{n^2}\\right)\\quad (n=2,3,\\ldots)$$",
      "symbols": "",
      "sym": [
        {
          "k": "$R$",
          "mean": "Rydberg",
          "unit": "m$^{-1}$"
        }
      ],
      "when": "Dãy Lyman nguyên tử H (UV). Sách BT dạng 6."
    }
  ],
  "traps": [
    {
      "title": "$A$ công thoát ≠ công $P\\Delta V$",
      "text": " Einstein: $hf=A+K_{\\max}$. $A$ là công thoát (work function), không phải $\\Delta U=Q+A$ nhiệt động."
    },
    {
      "title": "$T$ kelvin",
      "text": " Đổi chính xác $T=t+273{,}15$. Nếu đề quy ước $+273$ thì $527^\\circ$C được lấy xấp xỉ 800 K; nêu quy ước làm tròn khi tính $T^4$."
    },
    {
      "title": "Cường độ sáng",
      "text": " Ở tần số cố định và trong chế độ một photon, tăng cường độ tăng tốc độ photon tới và thường tăng dòng quang khi chưa bão hòa; động năng cực đại vẫn là hf − A."
    },
    {
      "title": "Ngưỡng $\\lambda_0$",
      "text": " $\\lambda>\\lambda_0$ dù rất sáng: không bật electron (nếu một photon)."
    }
  ],
  "visual": {
    "html": "<p><strong>Vật đen.</strong> Phổ $\\varepsilon(\\lambda,T)$: tăng $T$ thì $\\lambda_{\\max}$ dịch xanh (Wien), diện tích $\\propto T^4$.</p><p><strong>Quang điện.</strong> Photon $hf$ đập electron: phần $A$ thoát mặt, còn lại $K_{\\max}$. Lab: slider $f$ vs ngưỡng; $K$ tuyến tính với $f$.</p><p><strong>Ứng dụng.</strong> Tế bào quang điện: cửa tự động, báo trộm, dò khói (bài giảng). Photodiode / cảm biến camera.</p>"
  },
  "mcq": [
    {
      "level": "NB",
      "stem": "Định luật Stefan–Boltzmann (sách BT)",
      "choices": {
        "A": "$\\mathcal{E}=\\sigma T^4$",
        "B": "$\\mathcal{E}=-\\sigma T^4$",
        "C": "$\\mathcal{E}=\\sigma T^{-4}$",
        "D": "$\\mathcal{E}=-\\sigma T^{-4}$"
      },
      "answer": "A",
      "whyCorrect": "Năng suất bức xạ vật đen $\\propto T^4$, $T$ kelvin.",
      "whyWrong": {
        "B": "Dấu trừ vô nghĩa.",
        "C": "Đảo số mũ.",
        "D": "Sai."
      }
    },
    {
      "level": "TH",
      "stem": "Trong cân bằng nhiệt động giữa vật và trường bức xạ nhiệt, phát biểu nào sai?",
      "choices": {
        "A": "Nhiệt độ vật không đổi theo thời gian",
        "B": "Bức xạ nhiệt là sóng điện từ",
        "C": "Mọi sóng điện từ, kể cả tín hiệu anten được cấp điện, đều là bức xạ nhiệt cân bằng",
        "D": "Năng lượng bức xạ vật hấp thụ và phát ra cân bằng về trung bình"
      },
      "answer": "C",
      "whyCorrect": "C sai: sóng điện từ còn có thể được tạo bởi nguồn không ở cân bằng nhiệt như anten được cấp tín hiệu. A, B, D phù hợp với mô hình cân bằng nhiệt động đang xét.",
      "whyWrong": {
        "A": "Đúng trong cân bằng nhiệt động.",
        "B": "Bức xạ nhiệt là một dạng bức xạ điện từ.",
        "D": "Ở cân bằng, không có trao đổi năng lượng bức xạ ròng về trung bình."
      }
    },
    {
      "level": "NB",
      "stem": "Wien",
      "choices": {
        "A": "$\\lambda_{\\max}=b/T$",
        "B": "$\\mathcal{E}=\\sigma T^4$ gọi là Wien",
        "C": "$\\lambda=b/T^2$",
        "D": "không phụ thuộc $T$"
      },
      "answer": "A",
      "whyCorrect": "$\\lambda_{\\max}T=b$. Stefan mới là $T^4$.",
      "whyWrong": {
        "B": "Stefan–Boltzmann.",
        "C": "Sai mũ.",
        "D": "Sai."
      }
    },
    {
      "level": "VD",
      "stem": "Sao có $\\lambda_{\\max}\\approx 600$ nm. Ước $T$ ($b\\approx 2{,}9\\times 10^{-3}$ m·K)",
      "choices": {
        "A": "$\\approx 4800$ K",
        "B": "$5500$ K",
        "C": "$6000$ K",
        "D": "$580$ K"
      },
      "answer": "A",
      "whyCorrect": "$T=b/\\lambda=2{,}9\\times 10^{-3}/6\\times 10^{-7}\\approx 4830$ K $\\approx 4800$ K (sách BT).",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\approx 4800$ K.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\approx 4800$ K.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\approx 4800$ K."
      }
    },
    {
      "level": "TH",
      "stem": "Ứng dụng Wien",
      "choices": {
        "A": "ước nhiệt độ sao xa",
        "B": "máy dò khói (chủ yếu quang điện)",
        "C": "kính Polaroid",
        "D": "lồng Faraday"
      },
      "answer": "A",
      "whyCorrect": "Sách BT câu 4 dạng 1. Dò khói/cửa: tế bào quang điện.",
      "whyWrong": {
        "B": "Module ứng dụng quang điện.",
        "C": "Malus.",
        "D": "Điện học."
      }
    },
    {
      "level": "NB",
      "stem": "Planck: lượng tử năng lượng",
      "choices": {
        "A": "$\\varepsilon=hf=hc/\\lambda$",
        "B": "$\\varepsilon=h/f$",
        "C": "$\\varepsilon=-hf$",
        "D": "$\\varepsilon=h\\lambda/c$"
      },
      "answer": "A",
      "whyCorrect": "Năng lượng photon bằng hf, với λ là bước sóng chân không trong hc/λ.",
      "whyWrong": {
        "B": "Đảo.",
        "C": "Dấu trừ mức năng lượng H khác chỗ.",
        "D": "Sai."
      }
    },
    {
      "level": "TH",
      "stem": "Với chùm sáng đơn sắc có tần số cố định, cường độ bức xạ (W/m²) tỉ lệ với",
      "choices": {
        "A": "số photon tới trên một đơn vị diện tích trong một đơn vị thời gian",
        "B": "công thoát $A$",
        "C": "bắt buộc $\\sigma T^4$",
        "D": "bước sóng Wien của kim loại"
      },
      "answer": "A",
      "whyCorrect": "$I=\\dot N\\,hf/S$ khi photon phân bố đều trên diện tích S. Quan hệ tỉ lệ với tốc độ photon chỉ giữ khi f cố định; I không đồng nhất với số photon.",
      "whyWrong": {
        "B": "$A$ là kim loại.",
        "C": "Bức xạ nhiệt.",
        "D": "Khác hiện tượng."
      }
    },
    {
      "level": "NB",
      "stem": "Công thức Einstein quang điện. $A$ là",
      "choices": {
        "A": "công thoát (công giải phóng electron khỏi kim loại)",
        "B": "công nhiệt động $A=-\\int P\\,dV$",
        "C": "điện thế pin",
        "D": "hằng số Wien"
      },
      "answer": "A",
      "whyCorrect": "Bài giảng: $A$ công giải phóng. $hf=A+\\frac12 mv_{\\max}^2$. Không $\\Delta U=Q+A$.",
      "whyWrong": {
        "B": "Ký hiệu A được định nghĩa theo ngữ cảnh. Trong phương trình Einstein của đề, A là công thoát, không phải công trao đổi của khí.",
        "C": "Sai.",
        "D": "Sai."
      }
    },
    {
      "level": "TH",
      "stem": "$W_{\\max}$ quang electron phụ thuộc",
      "choices": {
        "A": "tần số $f$ và công thoát $A$, không phụ thuộc cường độ sáng",
        "B": "chỉ cường độ sáng",
        "C": "chỉ $T$ lò",
        "D": "không phụ thuộc $f$"
      },
      "answer": "A",
      "whyCorrect": "Định luật động năng cực đại + Einstein.",
      "whyWrong": {
        "B": "Cường độ $\\to$ số electron.",
        "C": "Bức xạ nhiệt.",
        "D": "Sai."
      }
    },
    {
      "level": "TH",
      "stem": "Ngưỡng năng lượng của quang điện ngoài trong mô hình một photon lý tưởng là",
      "choices": {
        "A": "$hf\\ge A$, tương đương $f\\ge f_0$ hay $\\lambda\\le\\lambda_0$",
        "B": "mọi $\\lambda$ nếu đủ sáng",
        "C": "$\\lambda>\\lambda_0$ bắt buộc",
        "D": "chỉ hồng ngoại mọi kim loại"
      },
      "answer": "A",
      "whyCorrect": "Tại ngưỡng $hf=A$ thì $K_{\\max}=0$. Muốn quang electron có động năng cực đại dương cần $hf>A$. Dưới ngưỡng, tăng số photon không bù thiếu năng lượng cho từng photon trong mô hình này.",
      "whyWrong": {
        "B": "Sai định luật 1.",
        "C": "Ngược.",
        "D": "Phụ thuộc $A$."
      }
    },
    {
      "level": "VD",
      "stem": "$A=2{,}0$ eV, $\\lambda=400$ nm. $K_{\\max}$ ($hc\\approx 1240$ eV·nm)",
      "choices": {
        "A": "$1{,}1$ eV",
        "B": "$2{,}0$ eV",
        "C": "$3{,}1$ eV",
        "D": "$0$ (không đủ $hf$)"
      },
      "answer": "A",
      "whyCorrect": "$hf=1240/400=3{,}1$ eV. $K=hf-A=1{,}1$ eV.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $1{,}1$ eV.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $1{,}1$ eV.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $1{,}1$ eV."
      }
    },
    {
      "level": "VD",
      "stem": "$\\lambda_0=500$ nm. Công thoát $A=hc/\\lambda_0$ cỡ",
      "choices": {
        "A": "$2{,}48$ eV",
        "B": "$5{,}0$ eV",
        "C": "$0{,}50$ eV",
        "D": "$1240$ eV"
      },
      "answer": "A",
      "whyCorrect": "$A=1240/500=2{,}48$ eV.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $2{,}48$ eV.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $2{,}48$ eV.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $2{,}48$ eV."
      }
    },
    {
      "level": "VD",
      "stem": "Lỗ lò coi là vật đen, $t=527^\\circ$C (lấy xấp xỉ $T=800$ K), $S=250$ cm$^2$. Công suất phát ra $P=\\sigma ST^4$ với $\\sigma=5{,}67\\times10^{-8}$ là",
      "choices": {
        "A": "$\\approx 1{,}42\\times 10^3$ W",
        "B": "$\\approx581$ W",
        "C": "$0{,}14$ W",
        "D": "$1{,}4\\times 10^4$ W"
      },
      "answer": "B",
      "whyCorrect": "$S=250\\times10^{-4}=0{,}025$ m$^2$. $P=5{,}67\\times10^{-8}\\times0{,}025\\times800^4=580{,}608$ W, làm tròn 581 W. Đây là công suất phát ra, chưa trừ bức xạ từ môi trường tới.",
      "whyWrong": {
        "A": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $\\approx581$ W.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $\\approx581$ W.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án B, $\\approx581$ W."
      }
    },
    {
      "level": "TH",
      "stem": "Kirchhoff bức xạ (ý)",
      "choices": {
        "A": "vật hấp thụ tốt thì phát xạ tốt (cùng $\\lambda,T$)",
        "B": "vật trắng tuyệt đối phát mạnh hơn đen",
        "C": "không liên quan cân bằng",
        "D": "cấm vật đen"
      },
      "answer": "A",
      "whyCorrect": "Cơ sở vật đen: hấp thụ hoàn toàn $\\Rightarrow$ mẫu phát xạ.",
      "whyWrong": {
        "B": "Ngược.",
        "C": "Có.",
        "D": "Sai."
      }
    },
    {
      "level": "VDC",
      "stem": "Hệ phát hiện vật chắn dùng một tia sáng chiếu thẳng vào đầu thu quang; khi vật chặn tia, tín hiệu nào kích hoạt mạch?",
      "choices": {
        "A": "chắn sáng $\\Rightarrow$ giảm dòng quang $\\Rightarrow$ rơ-le",
        "B": "Wien đo $T$ người",
        "C": "lồng Faraday",
        "D": "Young"
      },
      "answer": "A",
      "whyCorrect": "Trong cấu hình tia xuyên thẳng, vật chặn tia làm giảm quang thông tới và giảm dòng quang. Đầu báo khói kiểu tán xạ có cấu hình khác: khói có thể làm tăng ánh sáng tới đầu thu.",
      "whyWrong": {
        "B": "Không phải nguyên lý chính cửa.",
        "C": "Điện.",
        "D": "Quang sóng."
      }
    },
    {
      "level": "TH",
      "stem": "Photodiode / cảm biến camera gần với",
      "choices": {
        "A": "hiệu ứng quang điện (photon $\\to$ hạt tải)",
        "B": "chỉ loa Lorentz",
        "C": "O-G",
        "D": "ống nhòm TIR bắt buộc"
      },
      "answer": "A",
      "whyCorrect": "Ứng dụng hiện đại của quang điện / quang nội.",
      "whyWrong": {
        "B": "Từ.",
        "C": "Điện.",
        "D": "Hình học."
      }
    },
    {
      "level": "VD",
      "stem": "Sao xấp xỉ vật đen $T=4300$ K, $b=2{,}9\\times10^{-3}$ m·K. Bước sóng cực đại của phổ theo bước sóng và vùng phổ chứa nó là",
      "choices": {
        "A": "$\\approx674$ nm, thuộc vùng đỏ của phổ khả kiến",
        "B": "$132$ nm, không thấy",
        "C": "$89$ nm, đỏ",
        "D": "$500$ nm, xanh"
      },
      "answer": "A",
      "whyCorrect": "$\\lambda_{\\max}=b/T=674{,}4$ nm. Đây là vị trí cực đại phổ, không có nghĩa ngôi sao chỉ phát ánh sáng đỏ; màu nhìn thấy phụ thuộc toàn bộ phổ và đáp ứng mắt.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\approx674$ nm, thuộc vùng đỏ của phổ khả kiến.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\approx674$ nm, thuộc vùng đỏ của phổ khả kiến.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\approx674$ nm, thuộc vùng đỏ của phổ khả kiến."
      }
    },
    {
      "level": "NB",
      "stem": "Planck nói phát xạ/hấp thụ năng lượng",
      "choices": {
        "A": "gián đoạn, bội của $\\varepsilon=hf$",
        "B": "liên tục mọi giá trị",
        "C": "chỉ $\\sigma T^4$ không $f$",
        "D": "cấm photon"
      },
      "answer": "A",
      "whyCorrect": "Dao động tử Planck trao đổi năng lượng theo các lượng hf; các mức cách nhau hf.",
      "whyWrong": {
        "B": "Cổ điển Rayleigh–Jeans thất bại.",
        "C": "Thiếu.",
        "D": "Einstein bổ sung photon."
      }
    },
    {
      "level": "TH",
      "stem": "Lyman (nguyên tử H) là dãy",
      "choices": {
        "A": "về mức $n=1$, thường UV",
        "B": "về $n=2$ (Balmer, nhìn thấy)",
        "C": "quang điện kim loại",
        "D": "sóng radio"
      },
      "answer": "A",
      "whyCorrect": "Sách BT dạng 6. $1/\\lambda=R(1-1/n^2)$.",
      "whyWrong": {
        "B": "Balmer.",
        "C": "Khác.",
        "D": "Sai."
      }
    },
    {
      "level": "VD",
      "stem": "Tăng cường độ sáng, $f$ cố định $>f_0$. $v_{\\max}$",
      "choices": {
        "A": "không đổi; số electron/thời gian tăng",
        "B": "tăng $\\propto\\sqrt{I}$",
        "C": "giảm",
        "D": "thành $0$"
      },
      "answer": "A",
      "whyCorrect": "Ở f cố định, $K_{\\max}=hf-A$ không đổi nên $v_{\\max}$ không đổi. Số photon tới mỗi giây tăng, số quang electron phát ra thường tăng trong chế độ tuyến tính, chưa bão hòa.",
      "whyWrong": {
        "B": "Cổ điển sai.",
        "C": "Sai.",
        "D": "Sai."
      }
    },
    {
      "level": "VDC",
      "stem": "Phát biểu nào <strong>sai</strong>?",
      "choices": {
        "A": "$hf=A+\\frac12 mv_{\\max}^2$ với $A$ công thoát",
        "B": "vật đen $\\mathcal{E}=\\sigma T^4$",
        "C": "$A$ trong Einstein là công của khí lý tưởng $-\\int P dV$",
        "D": "$\\lambda_0=hc/A$"
      },
      "answer": "C",
      "whyCorrect": "C nhầm nhiệt động. A, B, D đúng DC1TT23.",
      "whyWrong": {
        "A": "Đúng.",
        "B": "Đúng.",
        "D": "Đúng."
      }
    },
    {
      "level": "TH",
      "stem": "Giá trị hằng số Planck trong hệ SI hiện hành là",
      "choices": {
        "A": "$h=6{,}62607015\\times10^{-34}$ J·s (chính xác)",
        "B": "$9\\times 10^9$",
        "C": "$1{,}6\\times 10^{-19}$ C gọi là $h$",
        "D": "$8{,}85\\times 10^{-12}$"
      },
      "answer": "A",
      "whyCorrect": "SI ấn định chính xác $h=6{,}62607015\\times10^{-34}$ J·s. Trong bài tính có h cho sẵn (chẳng hạn $6{,}625\\times10^{-34}$), dùng giá trị làm tròn của đề và không coi đó là giá trị SI chính xác.",
      "whyWrong": {
        "B": "$k$.",
        "C": "$e$.",
        "D": "$\\varepsilon_0$."
      }
    },
    {
      "level": "VD",
      "stem": "Photon $\\lambda=300$ nm. $\\varepsilon=hc/\\lambda$ ($h=6{,}625\\times 10^{-34}$)",
      "choices": {
        "A": "$\\approx 6{,}63\\times 10^{-19}$ J",
        "B": "$6{,}63\\times 10^{-34}$ J",
        "C": "$3{,}00\\times 10^8$ J",
        "D": "$1{,}6\\times 10^{-19}$ J"
      },
      "answer": "A",
      "whyCorrect": "$hc/\\lambda=6{,}625e-34\\cdot 3e8/3e-7=6{,}625\\times 10^{-19}$ J $\\approx 4{,}1$ eV.",
      "whyWrong": {
        "B": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\approx 6{,}63\\times 10^{-19}$ J.",
        "C": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\approx 6{,}63\\times 10^{-19}$ J.",
        "D": "Phương án này không khớp kết quả tính từ dữ kiện. Thay số theo công thức và đổi đơn vị như lời giải: đáp án A, $\\approx 6{,}63\\times 10^{-19}$ J."
      }
    },
    {
      "level": "VDC",
      "stem": "Hiệu suất lượng tử ngoài của đầu thu quang thụ động trong mô hình một photon tạo tối đa một hạt tải được thu, không có khuếch đại, là",
      "choices": {
        "A": "tỉ số số hạt tải quang được thu trên số photon tới, $0\\le\\eta\\le1$",
        "B": "luôn $=1$",
        "C": "$=\\sigma T^4$",
        "D": "$=n$ chiết suất"
      },
      "answer": "A",
      "whyCorrect": "η = N hạt tải được thu / N photon tới. Tổn hao phản xạ, truyền qua và tái hợp thường làm η < 1; giới hạn lý tưởng là 1. Hệ có nhân hạt tải phải tách hiệu suất lượng tử khỏi độ khuếch đại.",
      "whyWrong": {
        "B": "Lý tưởng hóa.",
        "C": "Nhiệt.",
        "D": "Quang hình."
      }
    }
  ],
  "essays": [
    {
      "kind": "Wien",
      "title": "Nhiệt độ sao",
      "problem": "<p>Sao xấp xỉ vật đen có $\\lambda_{\\max}=600$ nm. Tính T với $b=2{,}898\\times10^{-3}$ m·K và phân biệt vùng phổ cực đại với màu tổng hợp của sao.</p>",
      "tip": "Đổi nm. $T$ kelvin.",
      "steps": {
        "s1": "<p>Vật đen / sao xấp xỉ Wien.</p>",
        "s2": "<p>$\\lambda=6{,}00\\times 10^{-7}$ m.</p>",
        "s3": "<p>$T=b/\\lambda_{\\max}$.</p>",
        "s4": "<p>$T=4830$ K. Bước sóng 600 nm thuộc vùng cam của phổ. Sao phát phổ rộng, nên không thể coi màu tổng hợp của sao là màu đơn sắc 600 nm chỉ từ phép tính Wien này.</p>"
      }
    },
    {
      "kind": "Stefan",
      "title": "Công suất cửa lò",
      "problem": "<p>Lỗ lò coi là vật đen, $t=527^\\circ$C (dùng quy ước gần đúng $T=800$ K), $S=250$ cm$^2$. Tính công suất phát ra $P=\\sigma ST^4$, $\\sigma=5{,}67\\times10^{-8}$ W/(m$^2$·K$^4$).</p>",
      "tip": "Đổi diện tích và dùng T = 800 K theo đề. Công suất phát ra khác công suất trao đổi ròng với môi trường.",
      "steps": {
        "s1": "<p>Lỗ nhỏ $\\approx$ vật đen.</p>",
        "s2": "<p>$T=800$ K, $S=2{,}50\\times 10^{-2}$ m$^2$, $\\sigma=5{,}67\\times 10^{-8}$.</p>",
        "s3": "<p>$P=\\sigma S T^4$.</p>",
        "s4": "<p>$P=580{,}608$ W $\\approx581$ W. Nếu đổi chính xác $527+273{,}15=800{,}15$ K thì được khoảng 581,04 W; chênh lệch do quy ước làm tròn nhiệt độ.</p>"
      }
    },
    {
      "kind": "Einstein",
      "title": "Công thoát — không nhầm nhiệt động",
      "problem": "<p>Kim loại $A=2{,}5$ eV, $f=1{,}0\\times 10^{15}$ Hz. Tính $K_{\\max}$ eV. $h=4{,}14\\times 10^{-15}$ eV·s. Nhắc $A$ là gì.</p>",
      "tip": "$hf=A+K_{\\max}$.",
      "steps": {
        "s1": "<p>Quang điện ngoài. $A$ = công thoát, không $-\\int P dV$.</p>",
        "s2": "<p>$h$ eV·s cho khớp eV.</p>",
        "s3": "<p>$hf=4{,}14\\times 10^{-15}\\cdot 10^{15}=4{,}14$ eV. $K=hf-A$.</p>",
        "s4": "<p>$K_{\\max}=1{,}64$ eV. Nếu $hf<A$ thì không có electron.</p>"
      }
    },
    {
      "kind": "Ngưỡng",
      "title": "Giới hạn $\\lambda_0$",
      "problem": "<p>$A=1{,}8$ eV. Tính $\\lambda_0$. Quang điện với $\\lambda=700$ nm?</p>",
      "tip": "$hc\\approx 1240$ eV·nm.",
      "steps": {
        "s1": "<p>Ngưỡng $hf_0=A$.</p>",
        "s2": "<p>$\\lambda_0=hc/A$.</p>",
        "s3": "<p>$\\lambda_0=1240/1{,}8\\approx 689$ nm.</p>",
        "s4": "<p>$700>688{,}9$ nm nên photon 700 nm không đủ năng lượng gây quang điện ngoài theo mô hình một photon. Ngưỡng lý tưởng là $\\lambda\\le\\lambda_0$; tại dấu bằng, $K_{\\max}=0$.</p>"
      }
    },
    {
      "kind": "Ứng dụng",
      "title": "Cửa tự động / dò khói",
      "problem": "<p>Giải thích cảm biến tia sáng bị chắn và đầu báo khói quang học. Phân biệt tế bào quang điện ngoài với photodiode trong camera.</p>",
      "tip": "Photocathode kim loại: công thoát A. Photodiode bán dẫn: tạo cặp electron–lỗ trống, liên quan độ rộng vùng cấm E_g.",
      "steps": {
        "s1": "<p>Vật chắn tia tới đầu thu làm giảm dòng quang. Với đầu báo khói kiểu tán xạ, khói tán xạ ánh sáng vào đầu thu vốn đặt lệch tia nên tín hiệu có thể tăng; không quy mọi đầu báo khói về chắn sáng.</p>",
        "s2": "<p>Quang điện ngoài: photon cấp năng lượng để electron rời mặt kim loại, ngưỡng $hf\\ge A$. Photodiode: photon được hấp thụ trong bán dẫn, tạo cặp electron–lỗ trống khi năng lượng phù hợp vùng cấm và điều kiện hấp thụ.</p>",
        "s3": "<p>$K_{\\max}=hf-A$ áp dụng cho electron phát ra khỏi bề mặt trong mô hình quang điện ngoài. Không dùng công thoát A thay $E_g$ để tính ngưỡng photodiode. Mối nối và mạch thu gom hạt tải tạo tín hiệu điện.</p>",
        "s4": "<p>Camera tích hợp điện tích từ ma trận cảm biến. Dòng quang tỉ lệ quang thông trong vùng tuyến tính, còn phụ thuộc bước sóng, hiệu suất lượng tử, thời gian phơi sáng và bão hòa.</p>"
      }
    },
    {
      "kind": "Lyman",
      "title": "Dãy Lyman (sách BT)",
      "problem": "<p>Chuyển $n=2\\to 1$ hydro. $R=1{,}097\\times 10^7$ m$^{-1}$. Tính $\\lambda$.</p>",
      "tip": "$1/\\lambda=R(1-1/4)$.",
      "steps": {
        "s1": "<p>Lyman: về $n=1$, UV.</p>",
        "s2": "<p>$R$ SI.</p>",
        "s3": "<p>$1/\\lambda=R\\cdot 3/4$.</p>",
        "s4": "<p>$\\lambda=4/(3R)\\approx 1{,}215\\times 10^{-7}$ m $=121{,}5$ nm (Lyman-$\\alpha$).</p>"
      }
    }
  ]
});
